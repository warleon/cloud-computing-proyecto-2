# 🍕 Proyecto: Sistema Completo de Gestión y Pedidos para Pizzería

## 📌 Descripción General

El proyecto consiste en desarrollar un sistema completo que incluya:

- **2 interfaces de usuario (UIs)**:

  - App web para el **cliente**
  - Dashboard web para el **restaurante** (cocina, empaquetado, analytics, repartidor)

- **Backend con WebSockets**

- **Base de datos con catálogos de productos y pedidos**

- **Flujos en tiempo real** entre cliente → cocina → empaquetado → repartidor → cliente

El objetivo es replicar un sistema de pedidos similar al de Pizza Hut con una arquitectura moderna y distribuida.

---

# 📌 1. Requerimientos Funcionales

## 🧭 1.1. Aplicación del Cliente

1. El cliente puede **activar ubicación** o **seleccionar una sede manualmente**.
2. La sede seleccionada define el **tenant** del pedido.
3. Se muestra un **catálogo de productos**.
4. El cliente puede:

   - Añadir productos al carrito
   - Seleccionar cantidades

5. El cliente puede **confirmar pedido**.
6. El cliente visualiza una pantalla con el **estado del pedido** en tiempo real:

   - `queued`
   - `cooking`
   - `packing`
   - `waiting_for_courier`
   - `delivering`
   - `delivered`

## 🧑‍🍳 1.2. Dashboard del Restaurante

### Pantalla de Cocina

1. WebSocket recibe pedidos automáticamente.
2. Muestra dos columnas:

   - **Pedidos en cola**
   - **Pedidos en preparación**

3. Click en un pedido → lo mueve a “preparación”.
4. WebSocket actualiza el estado al cliente.

### Pantalla de Empaquetado

1. Recibe pedidos que terminan de cocinarse.
2. Dos columnas:

   - **Por empaquetar**
   - **Empaquetándose**

3. Click → mueve el pedido al otro board.
4. Cuando termina → pasa a `waiting_for_courier`.

### Pantalla de Analytics

- Pendiente: mostrar métricas básicas.
- No bloqueante para el proyecto.

## 🛵 1.3. Pantalla del Repartidor

1. Muestra pedidos **ordenados por distancia a la sede**.
2. El repartidor puede **aceptar** o **rechazar** un pedido.
3. Si nadie acepta, el pedido sigue esperando.
4. Una vez aceptado → se muestra una pantalla de entrega:

   - El cliente debe ingresar un **código secreto** generado al crear el pedido.

5. Al ingresar el código → el sistema marca el pedido como **delivered**.

## 🗄️ 1.4. Backend

1. CRUD de productos.
2. CRUD y actualización de pedidos.
3. WebSockets:

   - Cliente → estado del pedido
   - Cocina/Empaquetado → pedidos en tiempo real
   - Repartidores → asignación de pedidos

4. Generación del **código secreto de entrega**.
5. Cálculo de distancias (mock o API simple).

## 🗃️ 1.5. Base de Datos

Tablas sugeridas:

- `tenants` (sedes)
- `products`
- `orders`
- `order_items`
- `couriers`
- `courier_sessions`
- `ws_connections` (sesiones WebSocket)
- `analytics` (beta)

---

# 📌 2. Lista de Tareas Principales

## 🧩 2.1. FRONTEND — Cliente

- [ ] UI: Selección de ubicación / sede
- [ ] UI: Catálogo de productos
- [ ] Carrito de compras
- [ ] Pantalla de estado del pedido (WebSocket)
- [ ] Integración con backend

## 🧑‍🍳 2.2. FRONTEND — Restaurante

### Cocina

- [ ] Board doble: cola / preparando
- [ ] Soporte WebSocket
- [ ] Eventos drag/click para mover pedidos

### Empaquetado

- [ ] Board doble: por empaquetar / empaquetando
- [ ] Comunicación WebSocket

### Repartidor

- [ ] Lista de pedidos por distancia
- [ ] Botón aceptar/rechazar
- [ ] Pantalla de entrega con código
- [ ] Finalizar pedido

### Analytics

- [ ] Dashboard básico (pendiente)

## 🔌 2.3. BACKEND

- [ ] Endpoints CRUD
- [ ] Generación de códigos
- [ ] Lógica de estados del pedido
- [ ] WebSockets para:

  - Cliente
  - Cocina
  - Empaquetado
  - Repartidores

- [ ] Streams para actualizar estados

## 🗃️ 2.4. BASE DE DATOS

- [ ] Crear tablas iniciales
- [ ] Seed de productos (Pizza Hut)
- [ ] Seed de sedes
- [ ] Seed de repartidores

## 🧪 2.5. TESTING

- [ ] Pruebas básicas de integración
- [ ] Pruebas de estados y flujos

---

# 📌 3. Repartición de Tareas (5 Personas)

## 👤 **Persona 1 — Frontend Cliente**

- [ ] Selección de sede
- [ ] Catálogo de productos
- [ ] Carrito
- [ ] Confirmación de pedido
- [ ] Estado del pedido (WebSocket)

**Deadline Hito 1 (23 Nov):**

- [ ] Catálogo + Carrito listos
- [ ] Pantalla inicial de sede lista

**Deadline Final (30 Nov):**

- [ ] Estado del pedido con WebSockets

---

## 👤 **Persona 2 — Frontend Restaurante (Cocina + Empaquetado)**

- [ ] UI de cocina (doble board)
- [ ] UI de empaquetado (doble board)
- [ ] Integración WebSocket

**Deadline Hito 1:**

- [ ] Pantallas base con boards estáticos
- [ ] Eventos click entre boards

**Deadline Final:**

- [ ] Conexión WebSocket completa

---

## 👤 **Persona 3 — Frontend Repartidor + Analytics**

- [ ] Lista de pedidos cercana
- [ ] Aceptar/Rechazar pedido
- [ ] Pantalla de entrega con código
- [ ] Dashboard analytics (simple)

**Deadline Hito 1:**

- [ ] Lista de pedidos + UI básica
- [ ] Vista de aceptación/rechazo

**Deadline Final:**

- [ ] Flujo de entrega con código

---

## 👤 **Persona 4 — Backend + WebSockets**

- [ ] Arquitectura del backend
- [ ] Endpoints para:

  - Crear pedido
  - Actualizar estado
  - Listar productos
  - Listar pedidos

- [ ] Gestión WebSockets

  - Cocina
  - Empaquetado
  - Cliente
  - Repartidor

- [ ] Generación de código secreto

**Deadline Hito 1:**

- [ ] Endpoints principales funcionando
- [ ] Base de WebSocket creada

**Deadline Final:**

- [ ] Flujos conectados extremo a extremo

---

## 👤 **Persona 5 — Base de Datos + Seeds + Integración**

- [ ] Diseño de la base de datos
- [ ] Seed de productos de Pizza Hut
- [ ] Seed de sedes
- [ ] Seed de repartidores
- [ ] Scripts de inicialización

**Deadline Hito 1:**

- [ ] Tablas definidas y creadas
- [ ] Seed de productos lista

**Deadline Final:**

- [ ] Seeds completas
- [ ] Validación de integraciones

---

# 📌 4. Deadlines

## 🗓️ **Primer Hito: Domingo 23 de Noviembre**

Entrega obligatoria:

- UI básicas (cliente, cocina, empaquetado, repartidor)
- Backend CRUD principal
- Base de datos con productos cargados
- WebSockets configurados (aunque sea en mock)

**Objetivo del hito:**
👉 Tener el **flujo básico sin tiempo real** funcionando.

---

## 🗓️ **Entrega Final: Sábado 30 de Noviembre**

- Todas las UIs completas e integradas
- WebSockets conectados en todo el sistema
- Flujo completo: cliente → cocina → empaquetado → repartidor → cliente
- Código de entrega funcionando
- Pruebas básicas

**Objetivo:**
👉 Proyecto completamente funcional y demo lista.
