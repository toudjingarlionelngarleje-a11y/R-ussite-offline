import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Calendar, Check, CheckCircle2, GraduationCap, Target } from 'lucide-react';
import { COUNTRIES, STUDY_LEVELS } from '../data';
import { EXAMS, SUBJECTS, useApp } from '../context/AppContext';

const WEEKDAYS = [
  { id: 1, short: 'Lun' },
  { id: 2, short: 'Mar' },
  { id: 3, short: 'Mer' },
  { id: 4, short: 'Jeu' },
  { id: 5, short: 'Ven' },
  { id: 6, short: 'Sam' },
  { id: 0, short: 'Dim' },
];

export const OnboardingScreen: React.FC = () => {
  const { activeProfile, screen, navigate, updateActiveProfile, notify } = useApp();

  const [country, setCountry] = useState(activeProfile?.country ?? 'Tchad');
  const [studyLevel, setStudyLevel] = useState(activeProfile?.studyLevel ?? STUDY_LEVELS[2]);
  const [examId, setExamId] = useState(activeProfile?.examId ?? 'bac-scientifique');
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>(
    activeProfile?.selectedSubjectIds ?? ['maths', 'physique', 'svt']
  );

  const [examDate, setExamDate] = useState(activeProfile?.examDate ?? '2027-06-15');
  const [currentLevel, setCurrentLevel] = useState<'debutant' | 'intermediaire' | 'avance'>(
    activeProfile?.currentLevel ?? 'intermediaire'
  );
  const [dailyMinutes, setDailyMinutes] = useState(activeProfile?.dailyMinutes ?? 45);
  const [restDays, setRestDays] = useState<number[]>(activeProfile?.restDays ?? [0]);
  const [targetScore, setTargetScore] = useState(activeProfile?.targetScore ?? 75);

  const handleSelectExam = (id: string) => {
    setExamId(id);
    const track = EXAMS.find((e) => e.id === id);
    if (track) setSelectedSubjectIds(track.subjectIds);
  };

  const toggleSubject = (id: string) => {
    setSelectedSubjectIds((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((x) => x !== id) : prev) : [...prev, id]
    );
  };

  const toggleRest = (day: number) => {
    setRestDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]));
  };

  const handleStep1Next = () => {
    updateActiveProfile({ country, studyLevel, examId, selectedSubjectIds });
    navigate('onboarding-goals');
  };

  const handleFinish = () => {
    updateActiveProfile({
      country,
      studyLevel,
      examId,
      selectedSubjectIds,
      examDate,
      currentLevel,
      dailyMinutes,
      restDays,
      targetScore,
      onboardingCompleted: true,
    });
    notify('Ton programme personnalisé hors ligne est prêt !', 'success');
    navigate('dashboard');
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Progress Steps */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-700 text-white">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              Configuration de ton parcours
            </p>
            <p className="text-xs text-slate-500">
              {screen === 'onboarding-exam' ? 'Étape 1 sur 2 — Examen & Matières' : 'Étape 2 sur 2 — Niveau & Objectifs'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-10 rounded-full bg-blue-700" />
          <span
            className={`h-2.5 w-10 rounded-full ${
              screen === 'onboarding-goals' ? 'bg-blue-700' : 'bg-slate-200 dark:bg-slate-700'
            }`}
          />
        </div>
      </div>

      {screen === 'onboarding-exam' ? (
        <div className="hc-card space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="ob-country" className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Ton pays
              </label>
              <select
                id="ob-country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
              >
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="ob-level" className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Ton niveau d’études
              </label>
              <select
                id="ob-level"
                value={studyLevel}
                onChange={(e) => setStudyLevel(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
              >
                {STUDY_LEVELS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Choisis ton examen, concours ou certification
            </h2>
            <div className="mt-2.5 grid gap-3 sm:grid-cols-2">
              {EXAMS.map((exam) => {
                const selected = examId === exam.id;
                return (
                  <button
                    key={exam.id}
                    type="button"
                    onClick={() => handleSelectExam(exam.id)}
                    className={`rounded-xl border-2 p-4 text-left transition ${
                      selected
                        ? 'border-blue-600 bg-blue-50/70 dark:border-blue-400 dark:bg-blue-950/50'
                        : 'border-slate-200 hover:border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {exam.shortName}
                      </span>
                      {selected && <CheckCircle2 className="h-4 w-4 text-blue-600" />}
                    </div>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                      {exam.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Matières à réviser ({selectedSubjectIds.length} sélectionnées)
            </h2>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {SUBJECTS.map((subj) => {
                const active = selectedSubjectIds.includes(subj.id);
                return (
                  <button
                    key={subj.id}
                    type="button"
                    onClick={() => toggleSubject(subj.id)}
                    className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold transition ${
                      active
                        ? 'border-blue-600 bg-blue-700 text-white'
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {active && <Check className="h-3.5 w-3.5" />}
                    {subj.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleStep1Next}
              className="inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-blue-700 px-6 py-2.5 text-sm font-bold text-white hover:bg-blue-800"
            >
              Suivant : Niveau & Objectifs
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="hc-card space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="ob-date" className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
                <Calendar className="h-4 w-4 text-blue-600" />
                Date prévue de l’épreuve
              </label>
              <input
                id="ob-date"
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
              />
            </div>

            <div>
              <label htmlFor="ob-target" className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
                <Target className="h-4 w-4 text-amber-600" />
                Objectif de score : {targetScore} % ({Math.round((targetScore / 100) * 20)}/20)
              </label>
              <input
                id="ob-target"
                type="range"
                min={50}
                max={95}
                step={5}
                value={targetScore}
                onChange={(e) => setTargetScore(Number(e.target.value))}
                className="mt-3 w-full accent-blue-700"
              />
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Ton niveau actuel estimé
            </p>
            <div className="mt-2 grid gap-2.5 sm:grid-cols-3">
              {[
                { id: 'debutant' as const, label: 'Débutant', desc: 'Je reprends les bases' },
                { id: 'intermediaire' as const, label: 'Intermédiaire', desc: 'Je maîtrise une partie du cours' },
                { id: 'avance' as const, label: 'Avancé', desc: 'Je vise la mention / le classement' },
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => setCurrentLevel(lvl.id)}
                  className={`rounded-xl border-2 p-3 text-left ${
                    currentLevel === lvl.id
                      ? 'border-blue-600 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/60'
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{lvl.label}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{lvl.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="ob-daily" className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
              Temps disponible chaque jour : <span className="text-blue-700 dark:text-blue-400">{dailyMinutes} minutes</span>
            </label>
            <input
              id="ob-daily"
              type="range"
              min={15}
              max={180}
              step={15}
              value={dailyMinutes}
              onChange={(e) => setDailyMinutes(Number(e.target.value))}
              className="mt-2 w-full accent-blue-700"
            />
            <div className="mt-1 flex justify-between text-[11px] text-slate-500">
              <span>15 min (transports)</span>
              <span>45 min (recommandé)</span>
              <span>3h (intensif)</span>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Jours de repos (sans surcharge)
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {WEEKDAYS.map((d) => {
                const active = restDays.includes(d.id);
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => toggleRest(d.id)}
                    className={`rounded-xl border px-3.5 py-2 text-xs font-bold ${
                      active
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : 'border-slate-300 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {d.short}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('onboarding-exam')}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour
            </button>
            <button
              type="button"
              onClick={handleFinish}
              className="inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-emerald-700"
            >
              <CheckCircle2 className="h-4 w-4" />
              Générer mon programme & Commencer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
