-- Migrasi 8: domain suplier. Cloud hanya setelah persetujuan pemilik.
-- Tidak menghapus data; RLS tetap aktif dan akses fungsi hanya service_role.
begin;
alter table public.hub_records drop constraint hub_records_entity_check;
alter table public.hub_records add constraint hub_records_entity_check check(entity in ('organization','workstreams','milestones','work-items','units','checklist','stakeholders','interactions','meetings','decisions','documents','risks','issues','staff','trainings','journal','members','cash-entries','inventory-items','stock-counts','sprints','supplier'));
create function public.hub_supplier_ready() returns boolean language sql stable set search_path='' as $$ select true $$;
revoke all on function public.hub_supplier_ready() from public,anon,authenticated;
grant execute on function public.hub_supplier_ready() to service_role;
create or replace function public.hub_check_relations() returns trigger language plpgsql security definer set search_path = '' as $$
declare current_row public.hub_records; field text; target text; reference_id text; dependency text; has_cycle boolean;
begin
  if TG_OP = 'DELETE' then
    if not exists(select 1 from public.hub_records where id=OLD.id) and exists(
      select 1 from public.hub_records r where
      exists(select 1 from jsonb_each_text(r.data) pair where pair.key like '%\_id' escape '\' and pair.value=OLD.id::text)
      or coalesce(r.data->'dependencies','[]'::jsonb) ? OLD.id::text
    ) then raise exception 'Record is still referenced'; end if;
    return null;
  end if;
  select * into current_row from public.hub_records where id=NEW.id;
  if not found then return null; end if;
  for field,target in select * from (values
    ('journal_id','journal'),('item_id','inventory-items'),('workstream_id','workstreams'),('milestone_id','milestones'),('unit_id','units'),
    ('stakeholder_id','stakeholders'),('meeting_id','meetings'),('issue_id','issues'),('staff_id','staff'),
    ('work_item_id','work-items'),('sprint_id','sprints'),('member_id','members'),('document_id','documents')
  ) as refs(field,target) loop
    reference_id:=current_row.data->>field;
    if coalesce(reference_id,'')<>'' and not exists(select 1 from public.hub_records where id::text=reference_id and entity=target) then
      raise exception 'Missing related record';
    end if;
  end loop;
  if current_row.entity='work-items' then
    for dependency in select jsonb_array_elements_text(coalesce(current_row.data->'dependencies','[]'::jsonb)) loop
      if not exists(select 1 from public.hub_records where id::text=dependency and entity='work-items') then raise exception 'Missing dependency'; end if;
    end loop;
    with recursive walk(id,path,cycle) as (
      select current_row.id::text,array[current_row.id::text],false
      union all
      select edge.value,w.path || edge.value,edge.value=any(w.path)
      from walk w join public.hub_records r on r.id::text=w.id,
      lateral jsonb_array_elements_text(coalesce(r.data->'dependencies','[]'::jsonb)) edge(value)
      where not w.cycle
    ) select exists(select 1 from walk where cycle) into has_cycle;
    if has_cycle then raise exception 'Circular dependency'; end if;
  end if;
  return null;
end $$;

create function public.hub_validate_supplier() returns trigger language plpgsql set search_path='' as $$
begin
  if NEW.entity='supplier' and (coalesce(NEW.data->>'status','') not in ('aktif','nonaktif') or length(trim(coalesce(NEW.data->>'title','')))=0) then
    raise exception 'Invalid supplier title or status';
  end if;
  return NEW;
end $$;
create trigger hub_supplier_validation before insert or update on public.hub_records for each row execute function public.hub_validate_supplier();
revoke all on function public.hub_validate_supplier() from public,anon,authenticated;
commit;

