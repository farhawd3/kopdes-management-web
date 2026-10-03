import { AlertTriangle, ShieldAlert, ShieldCheck } from 'lucide-react';
import type { Item } from '@/features/schemas';

export function Meter({ value }: { value: number | null }) {
  return (
    <div className="meter-row">
      <div className="meter">
        <span style={{ width: `${value || 0}%` }} />
      </div>
      <strong>{value === null ? 'Belum dinilai' : `${value}%`}</strong>
    </div>
  );
}

export function RiskMatrix({ items }: { items: Item[] }) {
  const activeRisks = items.filter((row) => row.data.status !== 'ditutup');

  const highRisks = activeRisks.filter(
    (row) => Number(row.data.probability || 3) * Number(row.data.impact || 3) >= 15,
  );
  const mediumRisks = activeRisks.filter((row) => {
    const score = Number(row.data.probability || 3) * Number(row.data.impact || 3);
    return score >= 8 && score < 15;
  });
  const lowRisks = activeRisks.filter(
    (row) => Number(row.data.probability || 3) * Number(row.data.impact || 3) < 8,
  );

  const probabilityLevels = [
    {
      key: 'high',
      label: 'Sering',
      desc: 'Kemungkinan besar terjadi',
      test: (p: number) => p >= 4,
    },
    {
      key: 'mid',
      label: 'Kadang',
      desc: 'Pernah / sesekali terjadi',
      test: (p: number) => p === 3,
    },
    { key: 'low', label: 'Jarang', desc: 'Kecil kemungkinan muncul', test: (p: number) => p <= 2 },
  ];

  const impactLevels = [
    { key: 'low', label: 'Dampak Ringan', desc: 'Gangguan kecil', test: (i: number) => i <= 2 },
    {
      key: 'mid',
      label: 'Dampak Sedang',
      desc: 'Menghambat operasional',
      test: (i: number) => i === 3,
    },
    {
      key: 'high',
      label: 'Dampak Fatal',
      desc: 'Kerugian besar / izin terancam',
      test: (i: number) => i >= 4,
    },
  ];

  return (
    <section className="card risk-dashboard-section">
      <div className="section-head">
        <div>
          <h2>Pemantauan & Analisis Risiko Operasional</h2>
          <p className="risk-subtitle">
            Dikelompokkan secara sederhana agar manajer dapat segera mencegah potensi kerugian
            sebelum terjadi.
          </p>
        </div>
        <span className="badge">{activeRisks.length} risiko dipantau</span>
      </div>

      {/* 3 Kartu Tingkat Bahaya */}
      <div className="risk-summary-grid">
        <div className="risk-tier-card tier-high">
          <div className="tier-header">
            <ShieldAlert size={22} className="tier-icon text-red" />
            <div>
              <h3>Bahaya Kritis ({highRisks.length})</h3>
              <small>Perlu tindakan penanganan segera</small>
            </div>
          </div>
          <p className="tier-desc">
            Risiko dengan ancaman fatal terhadap kelancaran usaha, perizinan, atau kerugian keuangan
            besar.
          </p>
        </div>

        <div className="risk-tier-card tier-medium">
          <div className="tier-header">
            <AlertTriangle size={22} className="tier-icon text-amber" />
            <div>
              <h3>Perlu Waspada ({mediumRisks.length})</h3>
              <small>Siapkan langkah mitigasi</small>
            </div>
          </div>
          <p className="tier-desc">
            Risiko yang berpotensi menghambat pelayanan gerai atau keterlambatan pasokan.
          </p>
        </div>

        <div className="risk-tier-card tier-low">
          <div className="tier-header">
            <ShieldCheck size={22} className="tier-icon text-green" />
            <div>
              <h3>Terkendali ({lowRisks.length})</h3>
              <small>Aman dalam pengawasan staf</small>
            </div>
          </div>
          <p className="tier-desc">
            Risiko kecil atau kejadian jarang yang sudah ada prosedur standarnya.
          </p>
        </div>
      </div>

      {/* Matriks 3x3 yang Ramah & Mudah Dipahami */}
      <div className="risk-matrix-wrapper">
        <div className="matrix-title-wrap">
          <h3 className="matrix-title">Peta Sebaran Risiko (3 × 3)</h3>
          <small className="matrix-guide">
            Vertikal: Kemungkinan Terjadi · Horizontal: Tingkat Kerugian Dampak
          </small>
        </div>

        <div className="risk-matrix-scroll" role="region" aria-label="Matriks risiko" tabIndex={0}>
          <div className="risk-matrix-clean">
            <div className="matrix-header-corner" />
            {impactLevels.map((imp) => (
              <div key={imp.key} className="matrix-col-header">
                <strong>{imp.label}</strong>
                <small>{imp.desc}</small>
              </div>
            ))}

            {probabilityLevels.map((prob) => {
              return (
                <div key={`row-${prob.key}`} className="matrix-row-container">
                  <div className="matrix-row-header">
                    <strong>{prob.label}</strong>
                    <small>{prob.desc}</small>
                  </div>
                  {impactLevels.map((imp) => {
                    const cellItems = activeRisks.filter(
                      (r) =>
                        prob.test(Number(r.data.probability || 3)) &&
                        imp.test(Number(r.data.impact || 3)),
                    );
                    const isHigh =
                      (prob.key === 'high' && (imp.key === 'high' || imp.key === 'mid')) ||
                      (prob.key === 'mid' && imp.key === 'high');
                    const isMed =
                      (prob.key === 'high' && imp.key === 'low') ||
                      (prob.key === 'mid' && imp.key === 'mid') ||
                      (prob.key === 'low' && imp.key === 'high');
                    const cellTier = isHigh ? 'cell-high' : isMed ? 'cell-medium' : 'cell-low';

                    return (
                      <div key={`${prob.key}-${imp.key}`} className={`matrix-cell ${cellTier}`}>
                        <div className="matrix-cell-content">
                          <span className="cell-count-badge">
                            {cellItems.length ? `${cellItems.length} risiko` : '—'}
                          </span>
                          {cellItems.slice(0, 2).map((item) => (
                            <div
                              key={item.id}
                              className="matrix-risk-title"
                              title={String(item.data.title)}
                            >
                              • {String(item.data.title)}
                            </div>
                          ))}
                          {cellItems.length > 2 && (
                            <span className="matrix-more">+{cellItems.length - 2} lainnya</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Rencana Mitigasi Cepat untuk Risiko Aktif */}
      {activeRisks.length > 0 ? (
        <div className="risk-mitigation-list">
          <div className="section-head">
            <div>
              <h3>Rencana Tindakan & Mitigasi Risiko</h3>
              <p className="risk-subtitle">
                Langkah nyata pencegahan yang sedang dijalankan penanggung jawab.
              </p>
            </div>
          </div>
          <div className="risk-action-cards">
            {activeRisks.map((risk) => {
              const score = Number(risk.data.probability || 3) * Number(risk.data.impact || 3);
              const tier = score >= 15 ? 'Kritis' : score >= 8 ? 'Waspada' : 'Terkendali';
              const tierClass =
                score >= 15 ? 'badge-high' : score >= 8 ? 'badge-medium' : 'badge-low';

              return (
                <div key={risk.id} className="risk-action-card">
                  <div className="risk-card-head">
                    <span className={`risk-badge ${tierClass}`}>{tier}</span>
                    <strong className="risk-name">{String(risk.data.title)}</strong>
                  </div>
                  <div className="risk-card-body">
                    <p className="risk-mitigation-text">
                      <span className="label-bold">Mitigasi: </span>
                      {String(risk.data.mitigation || 'Belum ada catatan rencana mitigasi.')}
                    </p>
                    <div className="risk-meta">
                      <span>
                        Penanggung Jawab:{' '}
                        <strong>{String(risk.data.assignee || 'Belum ditugaskan')}</strong>
                      </span>
                      {Boolean(risk.data.review_date) && (
                        <span>
                          Tinjau Ulang: <strong>{String(risk.data.review_date)}</strong>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </section>
  );
}
