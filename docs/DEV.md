# 🔄 Sincronización de Tipos entre Backend (Pydantic) y Frontend (TypeScript)

Cuando se realicen cambios en los modelos Pydantic del backend, es necesario regenerar los tipos TypeScript utilizados por los frontends.
Para ello usamos **pydantic2ts**.

---

## 📦 1. Instalación de dependencias

### **pydantic2ts**

Instalar desde su repositorio:
👉 [https://github.com/phillipdupuis/pydantic-to-typescript](https://github.com/phillipdupuis/pydantic-to-typescript)

### **json2ts (json-schema-to-typescript)**

`pydantic2ts` requiere este paquete instalado **globalmente**:

```bash
npm install -g json-schema-to-typescript
```

---

## ⚙️ 2. Generar los tipos TypeScript desde Pydantic

Desde el **root del proyecto**, ejecutar:

### **Frontend del Cliente**

```bash
pydantic2ts.exe --module ./backend/types.py --output ./front-cliente/src/types/backend.ts
```

### **Frontend del Restaurante**

```bash
pydantic2ts.exe --module ./backend/types.py --output ./front-restaurant/src/types/backend.ts
```

---

## 🔁 3. ¿Cuándo ejecutar esto?

Cada vez que:

- Se agregue un nuevo modelo Pydantic
- Se modifiquen campos o tipos en `backend/types.py`
- Se eliminen modelos o propiedades

Esto asegura que los frontends siempre estén perfectamente sincronizados con los modelos del backend.
