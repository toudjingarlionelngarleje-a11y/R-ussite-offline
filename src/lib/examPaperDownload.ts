import { Annale, ExamTrack, Question, Subject } from '../types';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function buildExamPaperHtml(params: {
  annale: Annale;
  subject?: Subject;
  exam?: ExamTrack;
  questions: Question[];
  includeCorrection: boolean;
}): string {
  const { annale, subject, exam, questions, includeCorrection } = params;
  const letters = ['A', 'B', 'C', 'D', 'E'];

  const questionsHtml = questions
    .map((q, idx) => {
      const optionsHtml = q.options
        .map(
          (opt, i) => `
            <li class="option">
              <span class="checkbox"></span>
              <strong>${letters[i] ?? i + 1}.</strong> ${escapeHtml(opt)}
            </li>`
        )
        .join('');

      return `
        <section class="question">
          <div class="q-header">
            <span class="q-num">Exercice / Question ${idx + 1}</span>
            <span class="q-meta">${escapeHtml(q.notion)} · Difficulté : ${escapeHtml(q.difficulty)}</span>
          </div>
          ${q.context ? `<div class="q-context">${escapeHtml(q.context)}</div>` : ''}
          <p class="q-prompt">${escapeHtml(q.prompt)}</p>
          <ul class="options">${optionsHtml}</ul>
          <div class="draft-box">Espace brouillon / justification :</div>
        </section>`;
    })
    .join('');

  const correctionHtml = includeCorrection
    ? `
      <div class="page-break"></div>
      <section class="correction-block">
        <h2>Corrigé officiel &amp; explications étape par étape</h2>
        <p class="small">Ne consulte cette page qu’après avoir traité l’ensemble du sujet dans le temps imparti.</p>
        ${questions
          .map(
            (q, idx) => `
            <article class="corr-item">
              <h3>Question ${idx + 1} — Bonne réponse : ${letters[q.correctIndex] ?? q.correctIndex + 1} (${escapeHtml(q.options[q.correctIndex] ?? '')})</h3>
              <p><strong>Explication :</strong> ${escapeHtml(q.explanation)}</p>
              <ol>
                ${q.steps.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}
              </ol>
              <p class="source">Source : ${escapeHtml(q.source)}</p>
            </article>`
          )
          .join('')}
      </section>`
    : '';

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(annale.title)} — Réussite Offline</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 24px;
      line-height: 1.55;
    }
    .sheet { max-width: 820px; margin: 0 auto; }
    .header {
      border: 2px solid #1d4ed8;
      border-radius: 12px;
      padding: 18px 20px;
      margin-bottom: 20px;
      background: #f8fafc;
    }
    .brand { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #1d4ed8; }
    h1 { margin: 6px 0 8px; font-size: 20px; color: #0f172a; }
    .meta-grid { display: flex; flex-wrap: wrap; gap: 10px 20px; font-size: 13px; color: #334155; }
    .instructions {
      background: #eff6ff;
      border-left: 4px solid #1d4ed8;
      padding: 12px 14px;
      border-radius: 6px;
      font-size: 13px;
      margin-bottom: 22px;
    }
    .candidate-line {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 18px;
      font-size: 13px;
      color: #334155;
    }
    .question {
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      padding: 14px 16px;
      margin-bottom: 16px;
      page-break-inside: avoid;
    }
    .q-header { display: flex; justify-content: space-between; gap: 8px; flex-wrap: wrap; margin-bottom: 8px; }
    .q-num { font-weight: 800; color: #1d4ed8; font-size: 13px; text-transform: uppercase; }
    .q-meta { font-size: 12px; color: #64748b; }
    .q-context {
      background: #f1f5f9;
      padding: 10px 12px;
      border-radius: 6px;
      font-size: 13px;
      margin-bottom: 10px;
    }
    .q-prompt { font-size: 15px; font-weight: 700; margin: 0 0 10px; }
    .options { list-style: none; padding: 0; margin: 0 0 12px; }
    .option { display: flex; align-items: flex-start; gap: 8px; padding: 6px 8px; border-radius: 6px; font-size: 14px; }
    .checkbox {
      display: inline-block;
      width: 15px;
      height: 15px;
      border: 1.5px solid #475569;
      border-radius: 3px;
      margin-top: 3px;
      flex-shrink: 0;
    }
    .draft-box {
      border-top: 1px dashed #cbd5e1;
      padding-top: 8px;
      min-height: 44px;
      font-size: 11px;
      color: #94a3b8;
    }
    .page-break { page-break-before: always; margin-top: 32px; border-top: 2px dashed #94a3b8; padding-top: 20px; }
    .correction-block h2 { color: #059669; margin-bottom: 4px; }
    .corr-item {
      border: 1px solid #a7f3d0;
      background: #ecfdf5;
      border-radius: 10px;
      padding: 12px 14px;
      margin-bottom: 12px;
      page-break-inside: avoid;
    }
    .corr-item h3 { margin: 0 0 6px; font-size: 14px; color: #065f46; }
    .corr-item ol { margin: 6px 0 8px 18px; font-size: 13px; }
    .source, .small { font-size: 12px; color: #475569; }
    .print-bar {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-bottom: 14px;
    }
    .print-btn {
      background: #1d4ed8;
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 8px 14px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
    }
    @media print {
      body { padding: 0; }
      .print-bar { display: none; }
    }
  </style>
</head>
<body>
  <div class="sheet">
    <div class="print-bar">
      <button class="print-btn" onclick="window.print()">Imprimer / Enregistrer en PDF</button>
    </div>

    <header class="header">
      <div class="brand">Réussite Offline — Ancien sujet d’examen téléchargé hors ligne</div>
      <h1>${escapeHtml(annale.title)}</h1>
      <div class="meta-grid">
        <span><strong>Examen :</strong> ${escapeHtml(exam?.name ?? annale.examType)}</span>
        <span><strong>Matière :</strong> ${escapeHtml(subject?.name ?? annale.subjectId)}</span>
        <span><strong>Session :</strong> ${annale.year}${annale.countryOrZone ? ` (${escapeHtml(annale.countryOrZone)})` : ''}</span>
        <span><strong>Durée conseillée :</strong> ${annale.durationMinutes} min</span>
        <span><strong>Format :</strong> ${escapeHtml(annale.responseFormat)} (${questions.length} exercices)</span>
      </div>
    </header>

    <div class="candidate-line">
      <span>Nom &amp; Prénom : _____________________________</span>
      <span>Date : ___ / ___ / 20___</span>
      <span>Note obtenue : _____ / 20</span>
    </div>

    <div class="instructions">
      <strong>Consignes :</strong>
      ${escapeHtml(
        annale.instructions ??
          'Traite chaque question sans consulter ton cours. Coche la bonne réponse puis rédige ta justification dans l’espace prévu avant de vérifier le corrigé.'
      )}
      ${annale.bareme ? `<br /><strong>Barème indicatif :</strong> ${escapeHtml(annale.bareme)}` : ''}
    </div>

    ${questionsHtml}
    ${correctionHtml}
  </div>
</body>
</html>`;
}

export function downloadExamPaperFile(params: {
  annale: Annale;
  subject?: Subject;
  exam?: ExamTrack;
  questions: Question[];
  includeCorrection: boolean;
}): void {
  const html = buildExamPaperHtml(params);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const slug = params.annale.id.replace(/[^a-z0-9-]/gi, '-').toLowerCase();
  const suffix = params.includeCorrection ? 'sujet-et-corrige' : 'sujet-a-traiter';
  const a = document.createElement('a');
  a.href = url;
  a.download = `reussite-offline-${slug}-${params.annale.year}-${suffix}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
