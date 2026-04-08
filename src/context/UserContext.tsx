// User context for app state management
import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';

export type ThemeType = 'default' | 'coral' | 'lavender' | 'amber';
export type Language = 'pt' | 'en' | 'es' | 'fr';

const languageToLocale: Record<Language, string> = {
  pt: 'pt-BR',
  en: 'en-US',
  es: 'es-ES',
  fr: 'fr-FR',
};

const translations: Record<Language, Record<string, string>> = {
  pt: {
    "common.hello": "Olá",
    "nav.home": "Início",
    "nav.yoga": "Yoga",
    "nav.workouts": "Treinos",
    "nav.recipes": "Receitas",
    "nav.progress": "Progresso",
    "nav.profile": "Perfil",
    "nav.pilates": "Pilates",
    "home.todayBadge": "Seu momento de hoje",
    "home.todayTitle": "O que vamos fazer hoje?",
    "home.todaySubtitle": "Escolha uma área e comece agora. Depois a gente evolui com vídeos, receitas e metas.",
    "home.card.yogaDesc": "Sessões para corpo e mente",
    "home.card.workoutsDesc": "Rotinas curtas e objetivas",
    "home.card.recipesDesc": "Detox, FIT, chás e dietas",
    "home.card.pilatesDesc": "Controle e fortalecimento do core",
    "home.count.sessions": "{count} sessões",
    "home.count.workouts": "{count} treinos",
    "home.count.categories": "{count} categorias",
    "common.open": "Abrir",
    "common.play": "Play",
    "common.finish": "Finalizar",
    "activity.activeTime": "Tempo ativo",
    "pwa.banner.text": "📲 Deseja instalar como aplicativo?",
    "pwa.banner.installNow": "Instalar agora",
    "pwa.settings.install": "Instalar aplicativo",
    "pwa.settings.howInstallIphone": "Como instalar no iPhone",
    "pwa.settings.howUninstall": "Como desinstalar o aplicativo",
    "pwa.instructions.title": "Como instalar o aplicativo",
    "common.popular": "Popular",
    "yoga.badge.day01": "Dia 01",
    "common.seeAll": "Ver tudo",
    "common.clear": "Limpar",
    "common.days": "dias",
    "common.module": "Módulo",
    "common.modules": "Módulos",
    "common.comingSoonTitle": "Em breve",
    "common.comingSoonText": "Vamos adicionar conteúdo para esta seção a seguir.",
    "tabs.byGroup": "Por Grupo",
    "tabs.byArea": "Por Área",
    "tabs.programs": "Programas",
    "tabs.favorites": "Favoritos",
    "level.all": "Todos",
    "level.beginner": "Iniciante",
    "level.intermediate": "Intermediário",
    "level.advanced": "Avançado",
    "yoga.explore": "Explorar por área",
    "yoga.recommended": "Recomendados para você",
    "yoga.choose": "Escolha sua sessão de yoga",
    "workouts.explore": "Explorar por grupo",
    "workouts.recommended": "Recomendados para você",
    "workouts.choose": "Escolha seu treino",
    "workouts.view": "Ver",
    "workouts.start": "Iniciar Treino",
    "yoga.start": "Iniciar Sessão",
    "pilates.explore": "Explorar Pilates",
    "pilates.recommended": "Recomendados para você",
    "pilates.choose": "Escolha sua sessão de pilates",
    "pilates.start": "Iniciar Pilates",
    "pilates.searchTitle": "Buscar sessões de pilates",
    "pilates.modules": "Módulos de Pilates",
    "pilates.group.respiracao_base.title": "Respiração e Base do Pilates",
    "pilates.group.respiracao_base.desc": "Para iniciantes: controle, respiração e estabilidade.",
    "pilates.group.comece_o_dia.title": "Comece o Dia com Pilates",
    "pilates.group.comece_o_dia.desc": "Sessões curtas para ativar o corpo e melhorar mobilidade.",
    "pilates.group.fortalecimento.title": "Fortalecimento do Corpo",
    "pilates.group.fortalecimento.desc": "Treinos focados em força para músculos principais.",
    "pilates.group.core_abdomen.title": "Core e Abdômen",
    "pilates.group.core_abdomen.desc": "Estabilidade, postura e fortalecimento do centro.",
    "pilates.group.postura_dores.title": "Postura e Alívio de Dores",
    "pilates.group.postura_dores.desc": "Alivie tensão e melhore a postura com segurança.",
    "pilates.group.mobilidade_flexibilidade.title": "Mobilidade e Flexibilidade",
    "pilates.group.mobilidade_flexibilidade.desc": "Alongamento para aumentar mobilidade e prevenir lesões.",
    "pilates.group.em_pe.title": "Exercícios em Pé",
    "pilates.group.em_pe.desc": "Pilates funcional para equilíbrio e estabilidade.",
    "pilates.group.desafios_rapidos.title": "Desafios Rápidos",
    "pilates.group.desafios_rapidos.desc": "Sessões curtas para encaixar em qualquer dia.",
    "detail.exercises": "Exercícios",
    "module.casa.title": "Treinos em Casa",
    "module.academia.title": "Musculação na Academia",
    "module.corpo-firme.title": "Corpo Firme Total",
    "module.mobilidade.title": "Alongamento & Mobilidade",
    "module.core.title": "Abdomen Definido",
    "module.funcional.title": "Treino Funcional",
    "casa.banner.glutes": "Treinos para Glúteos",
    "casa.banner.challenges": "Desafio para Secar e Definir",
    "casa.banner.hypertrophy": "Treino para ganhar massa muscular",
    "casa.banner.weight_loss": "Treino para Emagrecimento",
    "academia.banner.glutes_posterior": "Treino completo Glúteos e Posterior",
    "academia.banner.arms": "Treino de Membros Superiores",
    "academia.banner.hypertrophy": "Treino para ganhar massa muscular",
    "academia.banner.weight_loss": "Treino para Emagrecimento",
    "mobilidade.banner.mob1": "Alongamento & Mobilidade 1",
    "mobilidade.banner.mob2": "Alongamento & Mobilidade 2",
    "topic.hypertrophy": "Hipertrofia",
    "topic.weight_loss": "Emagrecimento",
    "topic.glutes": "Treinos de Glúteo",
    "topic.challenges": "Desafios",
    "topic.strength_gain": "Ganho de força",
    "topic.full_body": "Corpo total",
    "topic.dumbbells": "Treinos com halteres",
    "topic.flexibility": "Flexibilidade",
    "topic.recovery": "Recuperação",
    "topic.prevention": "Prevenção",
    "topic.strength": "Força",
    "topic.stability": "Estabilidade",
    "topic.definition": "Definição",
    "topic.conditioning": "Condicionamento",
    "topic.explosion": "Explosão",
    "recipes.title": "Receitas",
    "recipes.chooseCategory": "Escolha uma categoria",
    "recipes.category.detoxJuices": "Sucos Detox",
    "recipes.category.fitMeals": "Receitas FIT",
    "recipes.category.detoxTeas": "Chás Detox",
    "recipes.category.personalDiet": "Dieta Personalizada",
    "recipes.desc.detoxJuices": "Receitas energizantes e refrescantes",
    "recipes.desc.fitMeals": "Pratos leves e nutritivos",
    "recipes.desc.detoxTeas": "Combinações calmantes e funcionais",
    "recipes.desc.personalDiet": "Planos feitos sob medida",
    "recipes.tapToOpen": "Toque para ver a receita completa",
    "recipes.ingredients": "Ingredientes",
    "recipes.preparation": "Preparo",
    "list.empty": "Nenhum item encontrado para este filtro.",
    "favorites.yogaEmpty": "Você ainda não salvou nenhuma sessão. Toque no coração para salvar!",
    "favorites.workoutsEmpty": "Você ainda não salvou nenhum treino. Toque no coração para salvar!",
    "common.tipTitle": "Dica rápida",
    "home.tipText": "Comece leve: 10–15 min já fazem diferença.",
    "home.goYoga": "Ir para Yoga",
    "home.progress.view": "Ver progresso",
    "auth.welcomeTitleA": "BEM-VINDO",
    "auth.welcomeTitleB": "AO",
    "auth.getStarted": "Começar agora",
    "auth.haveAccount": "Já tem conta?",
    "auth.signIn": "Entrar",
    "auth.loginTitleA": "ALONGAMENTO É",
    "auth.loginTitleB": "IMPORTANTE",
    "auth.loginSubtitle": "Alongar melhora sua saúde no longo prazo e aumenta sua longevidade.",
    "auth.apple": "Entrar com Apple",
    "auth.google": "Entrar com Google",
    "auth.notMember": "Ainda não é membro?",
    "auth.signUp": "Cadastre-se",
    "profile.preferences": "Preferências",
    "profile.app": "Aplicativo",
    "profile.language": "Idioma",
    "profile.editProfile": "Editar perfil",
    "profile.theme": "Tema",
    "profile.support": "Suporte",
    "profile.accountSettings": "Configurações da conta",
    "profile.sound": "Som",
    "profile.personalInfo": "Informações pessoais",
    "profile.reminders": "Lembretes",
    "profile.experienceLevel": "Nível de experiência",
    "profile.focusAreas": "Áreas de foco",
    "profile.careAreas": "Áreas de cuidado",
    "profile.healthConditions": "Condições de saúde",
    "profile.supportContact": "Contato de suporte",
    "theme.default": "Verde",
    "theme.coral": "Coral",
    "theme.lavender": "Lavanda",
    "theme.amber": "Âmbar",
    "language.pt": "Português",
    "language.en": "Inglês",
    "language.es": "Espanhol",
    "language.fr": "Francês",
    "common.back": "Voltar",
    "video.placeholderTitle": "Vídeo em breve",
    "video.placeholderSubtitle": "Você poderá adicionar o vídeo deste treino aqui.",
    "exercise.series": "Séries",
    "exercise.load": "Carga",
    "exercise.interval": "Intervalo",
    "exercise.instructions": "Instruções",
    "exercise.videoTitle": "Vídeo do exercício",
    "exercise.noVideoTitle": "Vídeo em breve",
    "exercise.noVideoText": "Você poderá adicionar o vídeo deste exercício aqui.",
    "common.cancel": "Cancelar",
    "common.save": "Salvar",
    "toast.profileUpdatedTitle": "Perfil atualizado!",
    "toast.profileUpdatedDesc": "Suas informações foram salvas",
    "modal.editProfile.title": "Editar perfil",
    "profile.name": "Nome",
    "profile.location": "Localização",
    "profile.namePlaceholder": "Seu nome",
    "profile.locationPlaceholder": "Cidade, País",
    "modal.personalInfo.title": "Informações pessoais",
    "profile.birthDate": "Data de nascimento",
    "profile.gender": "Gênero",
    "common.select": "Selecione",
    "gender.female": "Feminino",
    "gender.male": "Masculino",
    "gender.other": "Outro",
    "gender.noSay": "Prefiro não dizer",
    "profile.weightKg": "Peso (kg)",
    "profile.heightCm": "Altura (cm)",
    "toast.personalInfoSavedTitle": "Informações salvas!",
    "toast.personalInfoSavedDesc": "Seus dados pessoais foram atualizados",
    "modal.reminders.title": "Lembretes",
    "modal.reminders.desc": "Configure seus horários de lembrete para praticar yoga",
    "modal.experience.title": "Nível de experiência",
    "toast.experienceUpdatedTitle": "Nível atualizado!",
    "toast.experienceUpdatedDesc": "Suas sessões serão adaptadas ao seu nível",
    "exp.beginner.label": "Iniciante",
    "exp.beginner.desc": "Novo no yoga ou praticando há menos de 6 meses",
    "exp.intermediate.label": "Intermediário",
    "exp.intermediate.desc": "Praticando regularmente há 6 meses a 2 anos",
    "exp.advanced.label": "Avançado",
    "exp.advanced.desc": "Praticando há mais de 2 anos com conhecimento sólido",
    "reminder.morning": "Manhã",
    "reminder.afternoon": "Tarde",
    "reminder.evening": "Noite",
    "dashboard.title": "Painel",
    "dashboard.status": "Status",
    "dashboard.history": "Histórico",
    "dashboard.weekGoal": "Meta semanal",
    "dashboard.streak": "Sequência Ativa",
    "dashboard.totalTime": "Tempo Total",
    "dashboard.minutes": "min",
    "dashboard.calories": "Calorias",
    "dashboard.kcal": "kcal",
    "dashboard.recentYoga": "Yoga recente",
    "dashboard.recentActivity": "Atividade recente",
    "dashboard.myStats": "Minhas Estatísticas",
    "dashboard.activities": "Atividades",
    "dashboard.emptyHistoryTitle": "Nenhuma prática realizada ainda",
    "dashboard.emptyHistorySubtitle": "Comece sua jornada hoje!",
    "notFound.title": "Ops! Página não encontrada",
    "notFound.goHome": "Ir para Início",
    "search.title": "Buscar sessões",
    "search.placeholder": "Buscar por nome...",
    "search.empty": "Nenhuma sessão encontrada",
  },
  en: {
    "common.hello": "Hello",
    "nav.home": "Home",
    "nav.yoga": "Yoga",
    "nav.workouts": "Workouts",
    "nav.recipes": "Recipes",
    "nav.progress": "Progress",
    "nav.profile": "Profile",
    "nav.pilates": "Pilates",
    "home.todayBadge": "Your moment today",
    "home.todayTitle": "What are we doing today?",
    "home.todaySubtitle": "Pick an area and start now. We’ll add videos, recipes, and goals next.",
    "home.card.yogaDesc": "Sessions for body and mind",
    "home.card.workoutsDesc": "Short, focused routines",
    "home.card.recipesDesc": "Detox, fit meals, teas and diets",
    "home.card.pilatesDesc": "Core strength and control",
    "home.count.sessions": "{count} sessions",
    "home.count.workouts": "{count} workouts",
    "home.count.categories": "{count} categories",
    "common.open": "Open",
    "common.play": "Play",
    "common.finish": "Finish",
    "activity.activeTime": "Active time",
    "pwa.banner.text": "📲 Install as an app?",
    "pwa.banner.installNow": "Install now",
    "pwa.settings.install": "Install app",
    "pwa.settings.howInstallIphone": "How to install on iPhone",
    "pwa.settings.howUninstall": "How to uninstall the app",
    "pwa.instructions.title": "How to install the app",
    "common.popular": "Popular",
    "yoga.badge.day01": "Day 01",
    "common.seeAll": "See all",
    "common.clear": "Clear",
    "common.days": "days",
    "common.module": "Module",
    "common.modules": "Modules",
    "common.comingSoonTitle": "Coming soon",
    "common.comingSoonText": "We’ll add content for this section next.",
    "tabs.byGroup": "By group",
    "tabs.byArea": "By area",
    "tabs.programs": "Programs",
    "tabs.favorites": "Favorites",
    "level.all": "All",
    "level.beginner": "Beginner",
    "level.intermediate": "Intermediate",
    "level.advanced": "Advanced",
    "yoga.explore": "Explore by area",
    "yoga.recommended": "Recommended for you",
    "yoga.choose": "Choose your yoga session",
    "workouts.explore": "Explore by group",
    "workouts.recommended": "Recommended for you",
    "workouts.choose": "Choose your workout",
    "workouts.view": "View",
    "workouts.start": "Start workout",
    "yoga.start": "Start session",
    "pilates.explore": "Explore Pilates",
    "pilates.recommended": "Recommended for you",
    "pilates.choose": "Choose your pilates session",
    "pilates.start": "Start Pilates",
    "pilates.searchTitle": "Search pilates sessions",
    "pilates.modules": "Pilates modules",
    "pilates.group.respiracao_base.title": "Breathing & Pilates Basics",
    "pilates.group.respiracao_base.desc": "Beginner-friendly: control, breathing, and stability.",
    "pilates.group.comece_o_dia.title": "Start Your Day with Pilates",
    "pilates.group.comece_o_dia.desc": "Short sessions to activate the body and improve mobility.",
    "pilates.group.fortalecimento.title": "Full-Body Strength",
    "pilates.group.fortalecimento.desc": "Strength-focused sessions for key muscle groups.",
    "pilates.group.core_abdomen.title": "Core & Abdomen",
    "pilates.group.core_abdomen.desc": "Stability, posture, and core strength.",
    "pilates.group.postura_dores.title": "Posture & Pain Relief",
    "pilates.group.postura_dores.desc": "Ease tension and improve posture safely.",
    "pilates.group.mobilidade_flexibilidade.title": "Mobility & Flexibility",
    "pilates.group.mobilidade_flexibilidade.desc": "Stretching to improve mobility and prevent injuries.",
    "pilates.group.em_pe.title": "Standing Sessions",
    "pilates.group.em_pe.desc": "Functional pilates for balance and stability.",
    "pilates.group.desafios_rapidos.title": "Quick Challenges",
    "pilates.group.desafios_rapidos.desc": "Short sessions that fit any day.",
    "detail.exercises": "Exercises",
    "module.casa.title": "Workouts at Home",
    "module.academia.title": "Gym Strength Training",
    "module.corpo-firme.title": "Total Toning",
    "module.mobilidade.title": "Stretching & Mobility",
    "module.core.title": "Defined Abdomen",
    "module.funcional.title": "Functional Training",
    "casa.banner.glutes": "Glute Workouts",
    "casa.banner.challenges": "Cut & Define Challenge",
    "casa.banner.hypertrophy": "Build Muscle at Home",
    "casa.banner.weight_loss": "Weight Loss at Home",
    "academia.banner.glutes_posterior": "Complete workout: glutes & hamstrings",
    "academia.banner.arms": "Upper-body emphasis",
    "academia.banner.hypertrophy": "Gain muscle",
    "academia.banner.weight_loss": "Weight loss",
    "mobilidade.banner.mob1": "Stretching & Mobility 1",
    "mobilidade.banner.mob2": "Stretching & Mobility 2",
    "topic.hypertrophy": "Hypertrophy",
    "topic.weight_loss": "Weight loss",
    "topic.glutes": "Glute workouts",
    "topic.challenges": "Challenges",
    "topic.strength_gain": "Strength gain",
    "topic.full_body": "Full body",
    "topic.dumbbells": "Dumbbell workouts",
    "topic.flexibility": "Flexibility",
    "topic.recovery": "Recovery",
    "topic.prevention": "Prevention",
    "topic.strength": "Strength",
    "topic.stability": "Stability",
    "topic.definition": "Definition",
    "topic.conditioning": "Conditioning",
    "topic.explosion": "Power",
    "recipes.title": "Recipes",
    "recipes.chooseCategory": "Choose a category",
    "recipes.category.detoxJuices": "Detox Juices",
    "recipes.category.fitMeals": "Fit Recipes",
    "recipes.category.detoxTeas": "Detox Teas",
    "recipes.category.personalDiet": "Personalized Diet",
    "recipes.desc.detoxJuices": "Energizing and refreshing recipes",
    "recipes.desc.fitMeals": "Light and nutritious dishes",
    "recipes.desc.detoxTeas": "Calming and functional blends",
    "recipes.desc.personalDiet": "Plans made for you",
    "recipes.tapToOpen": "Tap to view the full recipe",
    "recipes.ingredients": "Ingredients",
    "recipes.preparation": "Preparation",
    "list.empty": "No items found for this filter.",
    "favorites.yogaEmpty": "You haven't saved any sessions yet. Tap the heart to save!",
    "favorites.workoutsEmpty": "You haven't saved any workouts yet. Tap the heart to save!",
    "common.tipTitle": "Quick tip",
    "home.tipText": "Start easy: 10–15 minutes already make a difference.",
    "home.goYoga": "Go to Yoga",
    "home.progress.view": "View progress",
    "auth.welcomeTitleA": "WELCOME",
    "auth.welcomeTitleB": "TO",
    "auth.getStarted": "Get started",
    "auth.haveAccount": "Already have an account?",
    "auth.signIn": "Sign in",
    "auth.loginTitleA": "STRETCHING IS",
    "auth.loginTitleB": "IMPORTANT",
    "auth.loginSubtitle": "Stretching improves your long-term health and longevity.",
    "auth.apple": "Continue with Apple",
    "auth.google": "Continue with Google",
    "auth.notMember": "Not a member yet?",
    "auth.signUp": "Sign up",
    "profile.preferences": "Preferences",
    "profile.app": "App",
    "profile.language": "Language",
    "profile.editProfile": "Edit profile",
    "profile.theme": "Theme",
    "profile.support": "Support",
    "profile.accountSettings": "Account settings",
    "profile.sound": "Sound",
    "profile.personalInfo": "Personal info",
    "profile.reminders": "Reminders",
    "profile.experienceLevel": "Experience level",
    "profile.focusAreas": "Focus areas",
    "profile.careAreas": "Care areas",
    "profile.healthConditions": "Health conditions",
    "profile.supportContact": "Support contact",
    "theme.default": "Green",
    "theme.coral": "Coral",
    "theme.lavender": "Lavender",
    "theme.amber": "Amber",
    "language.pt": "Portuguese",
    "language.en": "English",
    "language.es": "Spanish",
    "language.fr": "French",
    "common.back": "Back",
    "video.placeholderTitle": "Video coming soon",
    "video.placeholderSubtitle": "You’ll be able to add this workout video here.",
    "exercise.series": "Sets",
    "exercise.load": "Load",
    "exercise.interval": "Rest",
    "exercise.instructions": "Instructions",
    "exercise.videoTitle": "Exercise video",
    "exercise.noVideoTitle": "Video coming soon",
    "exercise.noVideoText": "You’ll be able to add this exercise video here.",
    "common.cancel": "Cancel",
    "common.save": "Save",
    "toast.profileUpdatedTitle": "Profile updated!",
    "toast.profileUpdatedDesc": "Your information has been saved",
    "modal.editProfile.title": "Edit profile",
    "profile.name": "Name",
    "profile.location": "Location",
    "profile.namePlaceholder": "Your name",
    "profile.locationPlaceholder": "City, Country",
    "modal.personalInfo.title": "Personal info",
    "profile.birthDate": "Birth date",
    "profile.gender": "Gender",
    "common.select": "Select",
    "gender.female": "Female",
    "gender.male": "Male",
    "gender.other": "Other",
    "gender.noSay": "Prefer not to say",
    "profile.weightKg": "Weight (kg)",
    "profile.heightCm": "Height (cm)",
    "toast.personalInfoSavedTitle": "Saved!",
    "toast.personalInfoSavedDesc": "Your personal info has been updated",
    "modal.reminders.title": "Reminders",
    "modal.reminders.desc": "Set your reminder times to practice yoga",
    "modal.experience.title": "Experience level",
    "toast.experienceUpdatedTitle": "Level updated!",
    "toast.experienceUpdatedDesc": "Your sessions will be adapted to your level",
    "exp.beginner.label": "Beginner",
    "exp.beginner.desc": "New to yoga or practicing for less than 6 months",
    "exp.intermediate.label": "Intermediate",
    "exp.intermediate.desc": "Practicing regularly for 6 months to 2 years",
    "exp.advanced.label": "Advanced",
    "exp.advanced.desc": "Practicing for more than 2 years with solid knowledge",
    "reminder.morning": "Morning",
    "reminder.afternoon": "Afternoon",
    "reminder.evening": "Evening",
    "dashboard.title": "Dashboard",
    "dashboard.status": "Status",
    "dashboard.history": "History",
    "dashboard.weekGoal": "Weekly goal",
    "dashboard.streak": "Active streak",
    "dashboard.totalTime": "Total time",
    "dashboard.minutes": "min",
    "dashboard.calories": "Calories",
    "dashboard.kcal": "kcal",
    "dashboard.recentYoga": "Recent yoga",
    "dashboard.recentActivity": "Recent activity",
    "dashboard.myStats": "My stats",
    "dashboard.activities": "Activities",
    "dashboard.emptyHistoryTitle": "No activity yet",
    "dashboard.emptyHistorySubtitle": "Start your journey today!",
    "notFound.title": "Oops! Page not found",
    "notFound.goHome": "Go to Home",
    "search.title": "Search sessions",
    "search.placeholder": "Search by name...",
    "search.empty": "No sessions found",
  },
  es: {
    "common.hello": "Hola",
    "nav.home": "Inicio",
    "nav.yoga": "Yoga",
    "nav.workouts": "Entrenamientos",
    "nav.recipes": "Recetas",
    "nav.progress": "Progreso",
    "nav.profile": "Perfil",
    "nav.pilates": "Pilates",
    "home.todayBadge": "Tu momento de hoy",
    "home.todayTitle": "¿Qué vamos a hacer hoy?",
    "home.todaySubtitle": "Elige un área y empieza ahora. Luego añadiremos videos, recetas y metas.",
    "home.card.yogaDesc": "Sesiones para cuerpo y mente",
    "home.card.workoutsDesc": "Rutinas cortas y directas",
    "home.card.recipesDesc": "Detox, FIT, tés y dietas",
    "home.card.pilatesDesc": "Fuerza y control del core",
    "home.count.sessions": "{count} sesiones",
    "home.count.workouts": "{count} entrenamientos",
    "home.count.categories": "{count} categorías",
    "common.open": "Abrir",
    "common.play": "Reproducir",
    "common.finish": "Finalizar",
    "activity.activeTime": "Tiempo activo",
    "pwa.banner.text": "📲 ¿Quieres instalar como app?",
    "pwa.banner.installNow": "Instalar ahora",
    "pwa.settings.install": "Instalar aplicación",
    "pwa.settings.howInstallIphone": "Cómo instalar en iPhone",
    "pwa.settings.howUninstall": "Cómo desinstalar la aplicación",
    "pwa.instructions.title": "Cómo instalar la aplicación",
    "common.popular": "Popular",
    "yoga.badge.day01": "Día 01",
    "common.seeAll": "Ver todo",
    "common.clear": "Limpiar",
    "common.days": "días",
    "common.module": "Módulo",
    "common.modules": "Módulos",
    "common.comingSoonTitle": "Próximamente",
    "common.comingSoonText": "Añadiremos contenido para esta sección a continuación.",
    "tabs.byGroup": "Por grupo",
    "tabs.byArea": "Por área",
    "tabs.programs": "Programas",
    "tabs.favorites": "Favoritos",
    "level.all": "Todos",
    "level.beginner": "Principiante",
    "level.intermediate": "Intermedio",
    "level.advanced": "Avanzado",
    "yoga.explore": "Explorar por área",
    "yoga.recommended": "Recomendados para ti",
    "yoga.choose": "Elige tu sesión de yoga",
    "workouts.explore": "Explorar por grupo",
    "workouts.recommended": "Recomendados para ti",
    "workouts.choose": "Elige tu entrenamiento",
    "workouts.view": "Ver",
    "workouts.start": "Iniciar entrenamiento",
    "yoga.start": "Iniciar sesión",
    "pilates.explore": "Explorar Pilates",
    "pilates.recommended": "Recomendados para ti",
    "pilates.choose": "Elige tu sesión de pilates",
    "pilates.start": "Iniciar Pilates",
    "pilates.searchTitle": "Buscar sesiones de pilates",
    "pilates.modules": "Módulos de pilates",
    "pilates.group.respiracao_base.title": "Respiración y Base de Pilates",
    "pilates.group.respiracao_base.desc": "Para principiantes: control, respiración y estabilidad.",
    "pilates.group.comece_o_dia.title": "Empieza el Día con Pilates",
    "pilates.group.comece_o_dia.desc": "Sesiones cortas para activar el cuerpo y mejorar movilidad.",
    "pilates.group.fortalecimento.title": "Fortalecimiento del Cuerpo",
    "pilates.group.fortalecimento.desc": "Entrenamientos de fuerza para músculos principales.",
    "pilates.group.core_abdomen.title": "Core y Abdomen",
    "pilates.group.core_abdomen.desc": "Estabilidad, postura y fortalecimiento del centro.",
    "pilates.group.postura_dores.title": "Postura y Alivio del Dolor",
    "pilates.group.postura_dores.desc": "Alivia tensión y mejora la postura con seguridad.",
    "pilates.group.mobilidade_flexibilidade.title": "Movilidad y Flexibilidad",
    "pilates.group.mobilidade_flexibilidade.desc": "Estiramientos para mejorar movilidad y prevenir lesiones.",
    "pilates.group.em_pe.title": "Ejercicios de Pie",
    "pilates.group.em_pe.desc": "Pilates funcional para equilibrio y estabilidad.",
    "pilates.group.desafios_rapidos.title": "Desafíos Rápidos",
    "pilates.group.desafios_rapidos.desc": "Sesiones cortas para cualquier día.",
    "detail.exercises": "Ejercicios",
    "module.casa.title": "Entrenamientos en Casa",
    "module.academia.title": "Musculación en el Gimnasio",
    "module.corpo-firme.title": "Cuerpo Firme Total",
    "module.mobilidade.title": "Estiramiento y Movilidad",
    "module.core.title": "Abdomen Definido",
    "module.funcional.title": "Entrenamiento Funcional",
    "casa.banner.glutes": "Entrenamientos para Glúteos",
    "casa.banner.challenges": "Desafío para Secar y Definir",
    "casa.banner.hypertrophy": "Entrenamiento para ganar masa muscular",
    "casa.banner.weight_loss": "Entrenamiento para Adelgazamiento",
    "academia.banner.glutes_posterior": "Rutina completa con énfasis en glúteos y posteriores",
    "academia.banner.arms": "Énfasis en brazos",
    "academia.banner.hypertrophy": "Ganar masa muscular",
    "academia.banner.weight_loss": "Adelgazamiento",
    "mobilidade.banner.mob1": "Estiramiento y Movilidad 1",
    "mobilidade.banner.mob2": "Estiramiento y Movilidad 2",
    "topic.hypertrophy": "Hipertrofia",
    "topic.weight_loss": "Adelgazamiento",
    "topic.glutes": "Glúteos",
    "topic.challenges": "Desafíos",
    "topic.strength_gain": "Ganancia de fuerza",
    "topic.full_body": "Cuerpo completo",
    "topic.dumbbells": "Con mancuernas",
    "topic.flexibility": "Flexibilidad",
    "topic.recovery": "Recuperación",
    "topic.prevention": "Prevención",
    "topic.strength": "Fuerza",
    "topic.stability": "Estabilidad",
    "topic.definition": "Definición",
    "topic.conditioning": "Acondicionamiento",
    "topic.explosion": "Explosión",
    "recipes.title": "Recetas",
    "recipes.chooseCategory": "Elige una categoría",
    "recipes.category.detoxJuices": "Jugos Detox",
    "recipes.category.fitMeals": "Recetas FIT",
    "recipes.category.detoxTeas": "Tés Detox",
    "recipes.category.personalDiet": "Dieta Personalizada",
    "recipes.desc.detoxJuices": "Recetas energizantes y refrescantes",
    "recipes.desc.fitMeals": "Platos ligeros y nutritivos",
    "recipes.desc.detoxTeas": "Mezclas calmantes y funcionales",
    "recipes.desc.personalDiet": "Planes a medida",
    "recipes.tapToOpen": "Toca para ver la receta completa",
    "recipes.ingredients": "Ingredientes",
    "recipes.preparation": "Preparación",
    "list.empty": "No se encontró contenido para este filtro.",
    "favorites.yogaEmpty": "Aún no has guardado ninguna sesión. ¡Toca el corazón para guardar!",
    "favorites.workoutsEmpty": "Aún no has guardado ningún entrenamiento. ¡Toca el corazón para guardar!",
    "common.tipTitle": "Consejo rápido",
    "home.tipText": "Empieza suave: 10–15 min ya marcan la diferencia.",
    "home.goYoga": "Ir a Yoga",
    "home.progress.view": "Ver progreso",
    "auth.welcomeTitleA": "BIENVENIDO",
    "auth.welcomeTitleB": "A",
    "auth.getStarted": "Empezar ahora",
    "auth.haveAccount": "¿Ya tienes cuenta?",
    "auth.signIn": "Entrar",
    "auth.loginTitleA": "ESTIRAR ES",
    "auth.loginTitleB": "IMPORTANTE",
    "auth.loginSubtitle": "Estirar mejora tu salud a largo plazo y aumenta tu longevidad.",
    "auth.apple": "Continuar con Apple",
    "auth.google": "Continuar con Google",
    "auth.notMember": "¿Aún no eres miembro?",
    "auth.signUp": "Regístrate",
    "profile.preferences": "Preferencias",
    "profile.app": "Aplicación",
    "profile.language": "Idioma",
    "profile.editProfile": "Editar perfil",
    "profile.theme": "Tema",
    "profile.support": "Soporte",
    "profile.accountSettings": "Ajustes de la cuenta",
    "profile.sound": "Sonido",
    "profile.personalInfo": "Información personal",
    "profile.reminders": "Recordatorios",
    "profile.experienceLevel": "Nivel de experiencia",
    "profile.focusAreas": "Áreas de enfoque",
    "profile.careAreas": "Áreas de cuidado",
    "profile.healthConditions": "Condiciones de salud",
    "profile.supportContact": "Contacto de soporte",
    "theme.default": "Verde",
    "theme.coral": "Coral",
    "theme.lavender": "Lavanda",
    "theme.amber": "Ámbar",
    "language.pt": "Portugués",
    "language.en": "Inglés",
    "language.es": "Español",
    "language.fr": "Francés",
    "common.back": "Volver",
    "video.placeholderTitle": "Vídeo próximamente",
    "video.placeholderSubtitle": "Podrás añadir el video de este entrenamiento aquí.",
    "exercise.series": "Series",
    "exercise.load": "Carga",
    "exercise.interval": "Intervalo",
    "exercise.instructions": "Instrucciones",
    "exercise.videoTitle": "Video del ejercicio",
    "exercise.noVideoTitle": "Vídeo próximamente",
    "exercise.noVideoText": "Podrás añadir el video de este ejercicio aquí.",
    "common.cancel": "Cancelar",
    "common.save": "Guardar",
    "toast.profileUpdatedTitle": "¡Perfil actualizado!",
    "toast.profileUpdatedDesc": "Tu información fue guardada",
    "modal.editProfile.title": "Editar perfil",
    "profile.name": "Nombre",
    "profile.location": "Ubicación",
    "profile.namePlaceholder": "Tu nombre",
    "profile.locationPlaceholder": "Ciudad, País",
    "modal.personalInfo.title": "Información personal",
    "profile.birthDate": "Fecha de nacimiento",
    "profile.gender": "Género",
    "common.select": "Seleccionar",
    "gender.female": "Femenino",
    "gender.male": "Masculino",
    "gender.other": "Otro",
    "gender.noSay": "Prefiero no decirlo",
    "profile.weightKg": "Peso (kg)",
    "profile.heightCm": "Altura (cm)",
    "toast.personalInfoSavedTitle": "¡Guardado!",
    "toast.personalInfoSavedDesc": "Tu información personal fue actualizada",
    "modal.reminders.title": "Recordatorios",
    "modal.reminders.desc": "Configura tus horarios de recordatorio para practicar yoga",
    "modal.experience.title": "Nivel de experiencia",
    "toast.experienceUpdatedTitle": "¡Nivel actualizado!",
    "toast.experienceUpdatedDesc": "Tus sesiones se adaptarán a tu nivel",
    "exp.beginner.label": "Principiante",
    "exp.beginner.desc": "Nuevo en yoga o practicando desde hace menos de 6 meses",
    "exp.intermediate.label": "Intermedio",
    "exp.intermediate.desc": "Practicando regularmente desde 6 meses hasta 2 años",
    "exp.advanced.label": "Avanzado",
    "exp.advanced.desc": "Practicando desde hace más de 2 años con buen conocimiento",
    "reminder.morning": "Mañana",
    "reminder.afternoon": "Tarde",
    "reminder.evening": "Noche",
    "dashboard.title": "Panel",
    "dashboard.status": "Estado",
    "dashboard.history": "Historial",
    "dashboard.weekGoal": "Meta semanal",
    "dashboard.streak": "Racha activa",
    "dashboard.totalTime": "Tiempo total",
    "dashboard.minutes": "min",
    "dashboard.calories": "Calorías",
    "dashboard.kcal": "kcal",
    "dashboard.recentYoga": "Yoga reciente",
    "dashboard.recentActivity": "Actividad reciente",
    "dashboard.myStats": "Mis estadísticas",
    "dashboard.activities": "Actividades",
    "dashboard.emptyHistoryTitle": "Aún no hay actividad",
    "dashboard.emptyHistorySubtitle": "¡Empieza tu camino hoy!",
    "notFound.title": "¡Ups! Página no encontrada",
    "notFound.goHome": "Ir al inicio",
    "search.title": "Buscar sesiones",
    "search.placeholder": "Buscar por nombre...",
    "search.empty": "No se encontró ninguna sesión",
  },
  fr: {
    "common.hello": "Bonjour",
    "nav.home": "Accueil",
    "nav.yoga": "Yoga",
    "nav.workouts": "Entraînements",
    "nav.recipes": "Recettes",
    "nav.progress": "Progrès",
    "nav.profile": "Profil",
    "nav.pilates": "Pilates",
    "home.todayBadge": "Votre moment du jour",
    "home.todayTitle": "Qu’est-ce qu’on fait aujourd’hui ?",
    "home.todaySubtitle": "Choisissez une section et commencez. Ensuite, on ajoute vidéos, recettes et objectifs.",
    "home.card.yogaDesc": "Séances pour le corps et l’esprit",
    "home.card.workoutsDesc": "Routines courtes et efficaces",
    "home.card.recipesDesc": "Détox, repas FIT, thés et régimes",
    "home.card.pilatesDesc": "Force et contrôle du centre",
    "home.count.sessions": "{count} séances",
    "home.count.workouts": "{count} entraînements",
    "home.count.categories": "{count} catégories",
    "common.open": "Ouvrir",
    "common.play": "Lire",
    "common.finish": "Terminer",
    "activity.activeTime": "Temps actif",
    "pwa.banner.text": "📲 Installer comme application ?",
    "pwa.banner.installNow": "Installer maintenant",
    "pwa.settings.install": "Installer l’application",
    "pwa.settings.howInstallIphone": "Installer sur iPhone",
    "pwa.settings.howUninstall": "Comment désinstaller l’application",
    "pwa.instructions.title": "Comment installer l’application",
    "common.popular": "Populaire",
    "yoga.badge.day01": "Jour 01",
    "common.seeAll": "Voir tout",
    "common.clear": "Effacer",
    "common.days": "jours",
    "common.module": "Module",
    "common.modules": "Modules",
    "common.comingSoonTitle": "Bientôt disponible",
    "common.comingSoonText": "Nous ajouterons du contenu pour cette section prochainement.",
    "tabs.byGroup": "Par groupe",
    "tabs.byArea": "Par zone",
    "tabs.programs": "Programmes",
    "tabs.favorites": "Favoris",
    "level.all": "Tous",
    "level.beginner": "Débutant",
    "level.intermediate": "Intermédiaire",
    "level.advanced": "Avancé",
    "yoga.explore": "Explorer par zone",
    "yoga.recommended": "Recommandés pour vous",
    "yoga.choose": "Choisissez votre séance de yoga",
    "workouts.explore": "Explorer par groupe",
    "workouts.recommended": "Recommandés pour vous",
    "workouts.choose": "Choisissez votre entraînement",
    "workouts.view": "Voir",
    "workouts.start": "Démarrer l’entraînement",
    "yoga.start": "Démarrer la séance",
    "pilates.explore": "Explorer le Pilates",
    "pilates.recommended": "Recommandés pour vous",
    "pilates.choose": "Choisissez votre séance de pilates",
    "pilates.start": "Démarrer le Pilates",
    "pilates.searchTitle": "Rechercher des séances de pilates",
    "pilates.modules": "Modules de pilates",
    "pilates.group.respiracao_base.title": "Respiration & Bases du Pilates",
    "pilates.group.respiracao_base.desc": "Pour débutants : contrôle, respiration et stabilité.",
    "pilates.group.comece_o_dia.title": "Commencez la Journée avec Pilates",
    "pilates.group.comece_o_dia.desc": "Séances courtes pour activer le corps et améliorer la mobilité.",
    "pilates.group.fortalecimento.title": "Renforcement du Corps",
    "pilates.group.fortalecimento.desc": "Séances axées sur la force des principaux muscles.",
    "pilates.group.core_abdomen.title": "Core & Abdomen",
    "pilates.group.core_abdomen.desc": "Stabilité, posture et renforcement du centre.",
    "pilates.group.postura_dores.title": "Posture & Soulagement des Douleurs",
    "pilates.group.postura_dores.desc": "Soulagez la tension et améliorez la posture en sécurité.",
    "pilates.group.mobilidade_flexibilidade.title": "Mobilité & Souplesse",
    "pilates.group.mobilidade_flexibilidade.desc": "Étirements pour améliorer la mobilité et prévenir les blessures.",
    "pilates.group.em_pe.title": "Exercices Debout",
    "pilates.group.em_pe.desc": "Pilates fonctionnel pour l’équilibre et la stabilité.",
    "pilates.group.desafios_rapidos.title": "Défis Rapides",
    "pilates.group.desafios_rapidos.desc": "Séances courtes à faire n’importe quel jour.",
    "detail.exercises": "Exercices",
    "module.casa.title": "Entraînements à la Maison",
    "module.academia.title": "Musculation en Salle",
    "module.corpo-firme.title": "Tonification Totale",
    "module.mobilidade.title": "Étirements & Mobilité",
    "module.core.title": "Abdomen Défini",
    "module.funcional.title": "Entraînement Fonctionnel",
    "casa.banner.glutes": "Entraînements Fessiers",
    "casa.banner.challenges": "Défi Sécher & Définir",
    "casa.banner.hypertrophy": "Gagner du Muscle à la Maison",
    "casa.banner.weight_loss": "Perte de Poids à la Maison",
    "academia.banner.glutes_posterior": "Séance complète: fessiers & ischios",
    "academia.banner.arms": "Accent bras",
    "academia.banner.hypertrophy": "Gagner de la masse musculaire",
    "academia.banner.weight_loss": "Perte de poids",
    "mobilidade.banner.mob1": "Étirements & Mobilité 1",
    "mobilidade.banner.mob2": "Étirements & Mobilité 2",
    "topic.hypertrophy": "Hypertrophie",
    "topic.weight_loss": "Perte de poids",
    "topic.glutes": "Fessiers",
    "topic.challenges": "Défis",
    "topic.strength_gain": "Gain de force",
    "topic.full_body": "Corps entier",
    "topic.dumbbells": "Haltères",
    "topic.flexibility": "Souplesse",
    "topic.recovery": "Récupération",
    "topic.prevention": "Prévention",
    "topic.strength": "Force",
    "topic.stability": "Stabilité",
    "topic.definition": "Définition",
    "topic.conditioning": "Conditionnement",
    "topic.explosion": "Explosivité",
    "recipes.title": "Recettes",
    "recipes.chooseCategory": "Choisissez une catégorie",
    "recipes.category.detoxJuices": "Jus Détox",
    "recipes.category.fitMeals": "Recettes FIT",
    "recipes.category.detoxTeas": "Thés Détox",
    "recipes.category.personalDiet": "Régime Personnalisé",
    "recipes.desc.detoxJuices": "Recettes énergisantes et rafraîchissantes",
    "recipes.desc.fitMeals": "Plats légers et nutritifs",
    "recipes.desc.detoxTeas": "Mélanges apaisants et fonctionnels",
    "recipes.desc.personalDiet": "Plans sur mesure",
    "recipes.tapToOpen": "Touchez pour voir la recette complète",
    "recipes.ingredients": "Ingrédients",
    "recipes.preparation": "Préparation",
    "list.empty": "Aucun élément trouvé pour ce filtre.",
    "favorites.yogaEmpty": "Vous n’avez encore enregistré aucune séance. Touchez le cœur pour enregistrer !",
    "favorites.workoutsEmpty": "Vous n’avez encore enregistré aucun entraînement. Touchez le cœur pour enregistrer !",
    "common.tipTitle": "Astuce rapide",
    "home.tipText": "Commencez doucement : 10–15 min font déjà la différence.",
    "home.goYoga": "Aller au Yoga",
    "home.progress.view": "Voir les progrès",
    "auth.welcomeTitleA": "BIENVENUE",
    "auth.welcomeTitleB": "CHEZ",
    "auth.getStarted": "Commencer",
    "auth.haveAccount": "Vous avez déjà un compte ?",
    "auth.signIn": "Se connecter",
    "auth.loginTitleA": "S’ÉTIRER, C’EST",
    "auth.loginTitleB": "IMPORTANT",
    "auth.loginSubtitle": "Les étirements améliorent votre santé sur le long terme et votre longévité.",
    "auth.apple": "Continuer avec Apple",
    "auth.google": "Continuer avec Google",
    "auth.notMember": "Pas encore membre ?",
    "auth.signUp": "S’inscrire",
    "profile.preferences": "Préférences",
    "profile.app": "Application",
    "profile.language": "Langue",
    "profile.editProfile": "Modifier le profil",
    "profile.theme": "Thème",
    "profile.support": "Support",
    "profile.accountSettings": "Paramètres du compte",
    "profile.sound": "Son",
    "profile.personalInfo": "Infos personnelles",
    "profile.reminders": "Rappels",
    "profile.experienceLevel": "Niveau d’expérience",
    "profile.focusAreas": "Zones de focus",
    "profile.careAreas": "Zones d’attention",
    "profile.healthConditions": "Conditions de santé",
    "profile.supportContact": "Contacter le support",
    "theme.default": "Vert",
    "theme.coral": "Corail",
    "theme.lavender": "Lavande",
    "theme.amber": "Ambre",
    "language.pt": "Portugais",
    "language.en": "Anglais",
    "language.es": "Espagnol",
    "language.fr": "Français",
    "common.back": "Retour",
    "video.placeholderTitle": "Vidéo bientôt disponible",
    "video.placeholderSubtitle": "Vous pourrez ajouter la vidéo de cet entraînement ici.",
    "exercise.series": "Séries",
    "exercise.load": "Charge",
    "exercise.interval": "Repos",
    "exercise.instructions": "Instructions",
    "exercise.videoTitle": "Vidéo de l’exercice",
    "exercise.noVideoTitle": "Vidéo bientôt disponible",
    "exercise.noVideoText": "Vous pourrez ajouter la vidéo de cet exercice ici.",
    "common.cancel": "Annuler",
    "common.save": "Enregistrer",
    "toast.profileUpdatedTitle": "Profil mis à jour !",
    "toast.profileUpdatedDesc": "Vos informations ont été enregistrées",
    "modal.editProfile.title": "Modifier le profil",
    "profile.name": "Nom",
    "profile.location": "Localisation",
    "profile.namePlaceholder": "Votre nom",
    "profile.locationPlaceholder": "Ville, Pays",
    "modal.personalInfo.title": "Infos personnelles",
    "profile.birthDate": "Date de naissance",
    "profile.gender": "Genre",
    "common.select": "Sélectionner",
    "gender.female": "Femme",
    "gender.male": "Homme",
    "gender.other": "Autre",
    "gender.noSay": "Je préfère ne pas le dire",
    "profile.weightKg": "Poids (kg)",
    "profile.heightCm": "Taille (cm)",
    "toast.personalInfoSavedTitle": "Enregistré !",
    "toast.personalInfoSavedDesc": "Vos informations ont été mises à jour",
    "modal.reminders.title": "Rappels",
    "modal.reminders.desc": "Configurez vos horaires de rappel pour pratiquer le yoga",
    "modal.experience.title": "Niveau d’expérience",
    "toast.experienceUpdatedTitle": "Niveau mis à jour !",
    "toast.experienceUpdatedDesc": "Vos séances seront adaptées à votre niveau",
    "exp.beginner.label": "Débutant",
    "exp.beginner.desc": "Nouveau en yoga ou pratique depuis moins de 6 mois",
    "exp.intermediate.label": "Intermédiaire",
    "exp.intermediate.desc": "Pratique régulière depuis 6 mois à 2 ans",
    "exp.advanced.label": "Avancé",
    "exp.advanced.desc": "Pratique depuis plus de 2 ans avec de bonnes bases",
    "reminder.morning": "Matin",
    "reminder.afternoon": "Après-midi",
    "reminder.evening": "Soir",
    "dashboard.title": "Tableau de bord",
    "dashboard.status": "Statut",
    "dashboard.history": "Historique",
    "dashboard.weekGoal": "Objectif hebdomadaire",
    "dashboard.streak": "Série active",
    "dashboard.totalTime": "Temps total",
    "dashboard.minutes": "min",
    "dashboard.calories": "Calories",
    "dashboard.kcal": "kcal",
    "dashboard.recentYoga": "Yoga récent",
    "dashboard.recentActivity": "Activité récente",
    "dashboard.myStats": "Mes statistiques",
    "dashboard.activities": "Activités",
    "dashboard.emptyHistoryTitle": "Aucune activité pour le moment",
    "dashboard.emptyHistorySubtitle": "Commencez votre parcours aujourd’hui !",
    "notFound.title": "Oups ! Page introuvable",
    "notFound.goHome": "Aller à l’accueil",
    "search.title": "Rechercher des séances",
    "search.placeholder": "Rechercher par nom...",
    "search.empty": "Aucune séance trouvée",
  },
};

export function createT(language: Language) {
  return (key: string) => translations[language]?.[key] ?? translations.pt[key] ?? key;
}

export function getLocale(language: Language) {
  return languageToLocale[language];
}

interface UserProfile {
  name: string;
  location: string;
  avatarUrl: string | null;
}

interface PersonalInfo {
  birthDate: string;
  gender: string;
  weight: string;
  height: string;
}

interface Reminder {
  id: string;
  time: string;
  label: string;
  enabled: boolean;
}

interface Preferences {
  experienceLevel: string;
  focusAreas: string[];
  careAreas: string[];
  healthConditions: string[];
  soundEnabled: boolean;
  theme: ThemeType;
  language: Language;
}

interface SessionHistory {
  id: number;
  sessionId: number;
  sessionTitle: string;
  date: string;
  duration: string;
  calories: string;
  activeSeconds?: number;
  activityType?: 'yoga' | 'workout' | 'pilates';
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

interface UserContextType {
  profile: UserProfile;
  updateProfile: (profile: Partial<UserProfile>) => void;
  personalInfo: PersonalInfo;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  reminders: Reminder[];
  updateReminder: (id: string, enabled: boolean) => void;
  preferences: Preferences;
  updatePreferences: (prefs: Partial<Preferences>) => void;
  savedSessions: number[];
  toggleSavedSession: (id: number) => void;
  sessionHistory: SessionHistory[];
  addSessionToHistory: (session: Omit<SessionHistory, 'id' | 'date'>) => void;
  workoutLoadOverrides: Record<string, string>;
  setWorkoutLoadOverride: (key: string, load: string | null) => void;
  pwaIsInstalled: boolean;
  pwaCanInstall: boolean;
  pwaIsIOS: boolean;
  pwaBannerDismissed: boolean;
  dismissPwaBanner: () => void;
  promptPwaInstall: () => Promise<"accepted" | "dismissed" | "unavailable">;
}

const defaultReminders: Reminder[] = [
  { id: '1', time: '07:00', label: 'Manhã', enabled: true },
  { id: '2', time: '12:00', label: 'Tarde', enabled: false },
  { id: '3', time: '19:00', label: 'Noite', enabled: true },
];

const defaultSessionHistory: SessionHistory[] = [
  { id: 1, sessionId: 1, sessionTitle: 'Wake Up', date: '2024-01-05', duration: '15 min', calories: '350 kcal', activeSeconds: 900, activityType: 'yoga' },
  { id: 2, sessionId: 2, sessionTitle: 'Lower Back', date: '2024-01-04', duration: '12 min', calories: '180 kcal', activeSeconds: 720, activityType: 'yoga' },
  { id: 3, sessionId: 3, sessionTitle: 'Pescoço e Ombros', date: '2024-01-03', duration: '12 min', calories: '120 kcal', activeSeconds: 720, activityType: 'yoga' },
  { id: 4, sessionId: 1, sessionTitle: 'Wake Up', date: '2024-01-02', duration: '15 min', calories: '350 kcal', activeSeconds: 900, activityType: 'yoga' },
];

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Ana',
    location: 'São Paulo, Brasil',
    avatarUrl: null,
  });

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    birthDate: '',
    gender: '',
    weight: '',
    height: '',
  });

  const [reminders, setReminders] = useState<Reminder[]>(defaultReminders);

  const [preferences, setPreferences] = useState<Preferences>({
    experienceLevel: '',
    focusAreas: [],
    careAreas: [],
    healthConditions: [],
    soundEnabled: true,
    theme: 'default',
    language: 'pt',
  });

  const [savedSessions, setSavedSessions] = useState<number[]>([1, 3]);

  const [sessionHistory, setSessionHistory] = useState<SessionHistory[]>(() => {
    const raw = localStorage.getItem("viva_fit_session_history");
    if (!raw) return defaultSessionHistory;
    try {
      const parsed = JSON.parse(raw) as SessionHistory[];
      if (!Array.isArray(parsed)) return defaultSessionHistory;
      return parsed.filter((x) => typeof x === "object" && x !== null) as SessionHistory[];
    } catch {
      return defaultSessionHistory;
    }
  });

  const [workoutLoadOverrides, setWorkoutLoadOverrides] = useState<Record<string, string>>(() => {
    const raw = localStorage.getItem("viva_fit_workout_load_overrides");
    if (!raw) return {};
    try {
      const parsed = JSON.parse(raw) as Record<string, string>;
      if (!parsed || typeof parsed !== "object") return {};
      return parsed;
    } catch {
      return {};
    }
  });

  const pwaIsIOS = useMemo(() => {
    const nav = navigator as unknown as { standalone?: boolean };
    const ua = navigator.userAgent || "";
    const isAppleMobile = /iPhone|iPad|iPod/i.test(ua);
    return isAppleMobile && typeof nav.standalone !== "undefined";
  }, []);

  const [pwaIsInstalled, setPwaIsInstalled] = useState<boolean>(() => {
    const stored = localStorage.getItem("viva_fit_pwa_installed") === "true";
    const nav = navigator as unknown as { standalone?: boolean };
    const standalone =
      window.matchMedia?.("(display-mode: standalone)")?.matches === true || nav.standalone === true;
    return stored || standalone;
  });

  const [pwaBannerDismissed, setPwaBannerDismissed] = useState<boolean>(() => {
    return localStorage.getItem("viva_fit_pwa_banner_dismissed") === "true";
  });

  const deferredPromptRef = React.useRef<BeforeInstallPromptEvent | null>(null);
  const [pwaCanInstall, setPwaCanInstall] = useState<boolean>(false);

  // Aplicar tema no documento
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-coral', 'theme-lavender', 'theme-amber');
    if (preferences.theme !== 'default') {
      root.classList.add(`theme-${preferences.theme}`);
    }
  }, [preferences.theme]);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('viva_fit_language') as Language | null;
    if (storedLanguage && ['pt', 'en', 'es', 'fr'].includes(storedLanguage)) {
      setPreferences(prev => ({ ...prev, language: storedLanguage }));
      return;
    }
    const browser = navigator.language?.toLowerCase() || '';
    const guessed: Language =
      browser.startsWith('pt') ? 'pt' :
      browser.startsWith('es') ? 'es' :
      browser.startsWith('fr') ? 'fr' :
      'en';
    setPreferences(prev => ({ ...prev, language: guessed }));
  }, []);

  useEffect(() => {
    document.documentElement.lang = getLocale(preferences.language);
    localStorage.setItem('viva_fit_language', preferences.language);
  }, [preferences.language]);

  useEffect(() => {
    localStorage.setItem("viva_fit_session_history", JSON.stringify(sessionHistory));
  }, [sessionHistory]);

  useEffect(() => {
    localStorage.setItem("viva_fit_workout_load_overrides", JSON.stringify(workoutLoadOverrides));
  }, [workoutLoadOverrides]);

  useEffect(() => {
    localStorage.setItem("viva_fit_pwa_banner_dismissed", pwaBannerDismissed ? "true" : "false");
  }, [pwaBannerDismissed]);

  useEffect(() => {
    localStorage.setItem("viva_fit_pwa_installed", pwaIsInstalled ? "true" : "false");
  }, [pwaIsInstalled]);

  useEffect(() => {
    const onBeforeInstallPrompt = (e: Event) => {
      const evt = e as BeforeInstallPromptEvent;
      evt.preventDefault();
      deferredPromptRef.current = evt;
      setPwaCanInstall(true);
    };

    const onAppInstalled = () => {
      setPwaIsInstalled(true);
      setPwaCanInstall(false);
      deferredPromptRef.current = null;
    };

    const mql = window.matchMedia?.("(display-mode: standalone)");
    const onDisplayModeChange = () => {
      const nav = navigator as unknown as { standalone?: boolean };
      const standalone = mql?.matches === true || nav.standalone === true;
      if (standalone) setPwaIsInstalled(true);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onAppInstalled);
    mql?.addEventListener?.("change", onDisplayModeChange);
    onDisplayModeChange();

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onAppInstalled);
      mql?.removeEventListener?.("change", onDisplayModeChange);
    };
  }, []);

  const updateProfile = (newProfile: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...newProfile }));
  };

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setPersonalInfo(prev => ({ ...prev, ...info }));
  };

  const updateReminder = (id: string, enabled: boolean) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, enabled } : r));
  };

  const updatePreferences = (prefs: Partial<Preferences>) => {
    setPreferences(prev => ({ ...prev, ...prefs }));
  };

  const toggleSavedSession = (id: number) => {
    setSavedSessions(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const addSessionToHistory = (session: Omit<SessionHistory, 'id' | 'date'>) => {
    const now = new Date();
    const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const newSession: SessionHistory = {
      ...session,
      id: Date.now(),
      date,
    };
    setSessionHistory(prev => [newSession, ...prev]);
  };

  const setWorkoutLoadOverride = (key: string, load: string | null) => {
    const normalized = (load ?? "").trim();
    setWorkoutLoadOverrides((prev) => {
      if (!normalized) {
        if (!(key in prev)) return prev;
        const next = { ...prev };
        delete next[key];
        return next;
      }
      if (prev[key] === normalized) return prev;
      return { ...prev, [key]: normalized };
    });
  };

  const dismissPwaBanner = () => setPwaBannerDismissed(true);

  const promptPwaInstall = async () => {
    const evt = deferredPromptRef.current;
    if (!evt) return "unavailable" as const;
    await evt.prompt();
    const choice = await evt.userChoice;
    if (choice.outcome === "accepted") {
      setPwaBannerDismissed(true);
      return "accepted" as const;
    }
    return "dismissed" as const;
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        updateProfile,
        personalInfo,
        updatePersonalInfo,
        reminders,
        updateReminder,
        preferences,
        updatePreferences,
        savedSessions,
        toggleSavedSession,
        sessionHistory,
        addSessionToHistory,
        workoutLoadOverrides,
        setWorkoutLoadOverride,
        pwaIsInstalled,
        pwaCanInstall,
        pwaIsIOS,
        pwaBannerDismissed,
        dismissPwaBanner,
        promptPwaInstall,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
