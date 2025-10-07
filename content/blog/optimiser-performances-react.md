---
title: "Optimiser les performances de vos applications React"
date: "2024-08-20"
description: "Techniques et bonnes pratiques pour améliorer les performances de vos applications React : mémoïsation, lazy loading, et bien plus."
tags: ["React", "Performance", "Optimisation", "JavaScript"]
---

# Optimiser les performances de vos applications React

Les performances sont cruciales pour l'expérience utilisateur. Voici mes techniques favorites pour optimiser les applications React.

## 1. Mémoïsation avec React.memo et useMemo

### React.memo pour les composants

```jsx
const ExpensiveComponent = React.memo(({ data, filter }) => {
  const filteredData = data.filter(filter)
  
  return (
    <div>
      {filteredData.map(item => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  )
})
```

### useMemo pour les calculs coûteux

```jsx
function DataTable({ data, sortKey, filterText }) {
  const processedData = useMemo(() => {
    return data
      .filter(item => item.name.includes(filterText))
      .sort((a, b) => a[sortKey] - b[sortKey])
  }, [data, sortKey, filterText])

  return <Table data={processedData} />
}
```

## 2. Code Splitting et Lazy Loading

### Lazy loading des composants

```jsx
import { lazy, Suspense } from 'react'

const HeavyComponent = lazy(() => import('./HeavyComponent'))

function App() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <HeavyComponent />
    </Suspense>
  )
}
```

### Route-based code splitting

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Home = lazy(() => import('./pages/Home'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
```

## 3. Optimisation des listes

### Virtualisation avec react-window

```jsx
import { FixedSizeList as List } from 'react-window'

const Row = ({ index, style, data }) => (
  <div style={style}>
    <div>Item {data[index].name}</div>
  </div>
)

function VirtualizedList({ items }) {
  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={50}
      itemData={items}
    >
      {Row}
    </List>
  )
}
```

## 4. Gestion d'état optimisée

### useCallback pour les fonctions

```jsx
function TodoList({ todos, onToggle, onDelete }) {
  const handleToggle = useCallback((id) => {
    onToggle(id)
  }, [onToggle])

  const handleDelete = useCallback((id) => {
    onDelete(id)
  }, [onDelete])

  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </div>
  )
}
```

### État local vs global

```jsx
// ❌ Éviter l'état global pour les données temporaires
const [formData, setFormData] = useGlobalState('form')

// ✅ Utiliser l'état local
const [formData, setFormData] = useState({})
```

## 5. Optimisation des images

### Lazy loading natif

```jsx
function OptimizedImage({ src, alt, ...props }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      {...props}
    />
  )
}
```

### WebP avec fallback

```jsx
function ResponsiveImage({ src, alt }) {
  return (
    <picture>
      <source srcSet={`${src}.webp`} type="image/webp" />
      <img src={`${src}.jpg`} alt={alt} loading="lazy" />
    </picture>
  )
}
```

## 6. Outils de mesure

### React DevTools Profiler

```jsx
import { Profiler } from 'react'

function App() {
  const onRenderCallback = (id, phase, actualDuration) => {
    console.log('Profiler:', { id, phase, actualDuration })
  }

  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <MyComponent />
    </Profiler>
  )
}
```

### Bundle analyzer

```bash
npm install --save-dev webpack-bundle-analyzer
```

## Checklist des performances

- [ ] Mémoïsation des composants coûteux
- [ ] Code splitting par routes
- [ ] Lazy loading des composants
- [ ] Virtualisation des longues listes
- [ ] Optimisation des images
- [ ] useCallback/useMemo appropriés
- [ ] Éviter les re-renders inutiles
- [ ] Profiling régulier

## Conclusion

L'optimisation des performances React est un processus itératif. Mesurez d'abord, optimisez ensuite, et n'optimisez que ce qui pose vraiment problème.

La règle d'or : **Premature optimization is the root of all evil** - Donald Knuth

*Quelles sont vos techniques d'optimisation favorites ? Partagez-les !*