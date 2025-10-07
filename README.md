# Adrian Pothuaud - Site Personnel

Site web personnel développé avec Gatsby et Pico.CSS, présentant mon travail, mes projets et mes articles de blog.

## 🚀 Technologies utilisées

- **Gatsby** - Framework React pour sites statiques
- **TypeScript** - Typage statique
- **Pico.CSS** - Framework CSS minimaliste et moderne
- **Sass** - Préprocesseur CSS
- **Markdown** - Contenu des articles et projets
- **GitHub Actions** - Déploiement automatique
- **GitHub Pages** - Hébergement

## 📁 Structure du projet

```
├── content/
│   ├── blog/           # Articles de blog en Markdown
│   └── projects/       # Projets en Markdown
├── src/
│   ├── components/     # Composants React réutilisables
│   ├── pages/          # Pages statiques
│   ├── templates/      # Templates pour pages dynamiques
│   └── styles/         # Styles globaux
├── .github/
│   └── workflows/      # Actions GitHub pour CI/CD
└── public/             # Assets statiques
```

## 🛠 Installation et développement

### Prérequis

- Node.js 18+
- npm ou yarn

### Installation

```bash
# Cloner le repository
git clone https://github.com/adrianpothuaud/adrianpothuaud.github.io.git
cd adrianpothuaud.github.io

# Installer les dépendances
npm install
```

### Développement

```bash
# Démarrer le serveur de développement
npm run develop

# Le site sera accessible sur http://localhost:8000
```

### Build

```bash
# Build de production
npm run build

# Servir le build localement
npm run serve
```

### Type checking

```bash
# Vérifier les types TypeScript
npm run typecheck
```

## 📝 Contenu

### Articles de blog

Les articles sont stockés dans `/content/blog/` au format Markdown avec frontmatter :

```markdown
---
title: "Titre de l'article"
date: "2024-10-01"
description: "Description courte"
tags: ["React", "TypeScript"]
---

# Contenu de l'article

Votre contenu ici...
```

### Projets

Les projets sont dans `/content/projects/` avec le frontmatter suivant :

```markdown
---
title: "Nom du projet"
date: "2024-10-01"
description: "Description du projet"
technologies: ["React", "Node.js"]
status: "Actif"
link: "https://projet.com"
github: "https://github.com/user/projet"
---

# Description détaillée du projet
```

## 🎨 Design et style

Le site utilise **Pico.CSS** pour un design moderne et minimaliste :

- **Design responsive** adapté mobile/desktop
- **Dark mode** supporté automatiquement
- **Accessibilité** optimisée
- **Performance** excellente (score Lighthouse 90+)

### Personnalisation des styles

Les styles personnalisés sont dans `/src/styles/globals.scss` et importés dans `/src/pages/index.scss`.

## 🚀 Déploiement

Le site est automatiquement déployé sur **GitHub Pages** via GitHub Actions :

1. **Trigger** : Push sur la branche `main`
2. **Build** : Gatsby génère le site statique
3. **Deploy** : Upload vers GitHub Pages
4. **URL** : https://adrianpothuaud.github.io

### Configuration requise

1. Activer GitHub Pages dans les paramètres du repository
2. Configurer la source sur "GitHub Actions"
3. Donner les permissions nécessaires aux Actions

## 📊 Performance

Le site est optimisé pour les performances :

- **SSG** (Static Site Generation) avec Gatsby
- **Images optimisées** avec gatsby-plugin-sharp
- **Code splitting** automatique
- **Lazy loading** des composants
- **CSS minifié** en production

## 🔧 Commandes utiles

```bash
# Nettoyer le cache Gatsby
npm run clean

# Développement avec rechargement automatique
npm run develop

# Build de production
npm run build

# Vérification TypeScript
npm run typecheck

# Servir le site en local après build
npm run serve
```

## 📱 Fonctionnalités

### Blog
- ✅ Articles en Markdown
- ✅ Système de tags
- ✅ Pages dynamiques
- ✅ Temps de lecture estimé
- ✅ Navigation entre articles

### Projets
- ✅ Fiches projets détaillées
- ✅ Technologies utilisées
- ✅ Statuts de projet
- ✅ Liens externes (GitHub, démo)
- ✅ Filtrage par technologie

### Interface
- ✅ Design responsive
- ✅ Navigation intuitive
- ✅ Mode sombre automatique
- ✅ Accessibilité WCAG
- ✅ Performance optimisée

## 🤝 Contribution

Ce site est open source. N'hésitez pas à :

- Signaler des bugs via les Issues
- Proposer des améliorations
- Soumettre des Pull Requests

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Contact

- **Email** : adrian@example.com
- **LinkedIn** : [adrian-pothuaud](https://linkedin.com/in/adrian-pothuaud)
- **GitHub** : [adrianpothuaud](https://github.com/adrianpothuaud)
- **Site web** : [adrianpothuaud.github.io](https://adrianpothuaud.github.io)

---

Développé avec ❤️ par Adrian Pothuaud
