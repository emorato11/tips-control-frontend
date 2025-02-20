# Mejoras

## Frontend

### Pantalla rentabilidad (general)

> Crear pantalla de rentabilidad.

La clave de esta pantalla es saber si el tipster seleccionado es rentable o no.

#### _Ideas (RG)_

- Poner un listado (en forma de botones) con los Tipsters que tenemos
- Poner una gráfica debajo del listado de Tipsters con la rentabilidad de todos, en formato de gráfica de columnas ([buscar librería para este tipo de gráfica](#gráfica-columnas)).
  - En cada columna, si hacemos hover en escritorio (o click si estamos en móvil), te desglosa el importe entre balance por tips y pagos para el tipster (tickets, premium, grupos...)
- Si hacemos click en un Tipster, redirigimos a su página de rentabilidad (yield/XXXX)
- Meter también el balance general (ver dónde colocarlo), para saber qué rentabilidad llevamos

### Pantalla rentabilidad (tipster)

> Crear pantalla de rentabilidad del Tipster.

Aquí desglosamos todo lo que podamos sobre la rentabilidad del tipster

#### _Ideas (RT)_

- Al entrar en la página, se muestra la gráfica que tenemos en la home, con todos los registros del tipster (tips y pagos).
- Los registros que se mostrarán serán los won, failed y paid.
- Tendremos filtro por fechas únicamente (utilizar las mejoras propuestas para [Filtro fechas](#filtro-fechas))
- Obvio, si hacemos filtro de fechas, se actualizan los datos.
- Debajo de la gráfica, podemos desglosar los datos de la siguiente manera
  - Balance en Tips
  - Pagos: Aquí mostraríamos todos los pagos que hemos realizado al tipster, ya decidiremos el formato, pero la idea es que se vea claro.
    - Una idea es mostrarlo en formato lista de bullets, con la siguiente estructura:

> Total XX,XX €
>
> - "Descripción corta del pago: importe con formato euro (dos decimales si hiciera falta)".
> - "Descripción corta del pago 2: importe con formato euro (dos decimales si hiciera falta)".  

### Pantalla Tipsters

> Dentro de la card del Tipster, podemos poner un enlace a su rentabilidad

### Home

#### Cuadro azul improves

> El título "Total" cambia si filtramos por fecha. La idea es que también ponga el Tipster que estamos filtrando.

El formato sería el siguiente:

- Si no hay tipster seleccionado ni tampoco filtro de fecha, **se muestra "Total" como hasta ahora**
- Si sólo hay filtro de fecha, **se muestra el formato como hasta ahora**
- Si sólo hay tipster seleccionado, mostrar el nombre del tipster + " - General"  
- Si hay ambos, mostrar el nombre del tipster + " - " y la fecha formateada

#### Filtrar por defecto el mes actual

> Creo que esto es más interesante para ver cómo va el mes y si queremos filtrar diferente, pues seleccionamos

#### Enlace a rentabilidad del Tipster que sea

> Cuando realicemos los cambios del cuadro azul, en caso de que tengamos seleccionado un Tipster, podemos poner un icono de info al lado del nombre que diga "Ver rentabilidad del Tipster", que lleve a la página "yield/X"

#### Finalizar Tip desde home

> Actualmente, si tenemos un tip "pendiente" y queremos cerrarlo, tenemos que navegar al tip en cuestion, cambiar los datos y hacer submit.

La idea es poner un botón de "Marcar como ganado" o "Marcar como perdido". Debería aparecer una confirmación para realizar esta acción.

### Filtro fechas

> Darle una vuelta a los filtros por si se puede mejorar

La idea es hacer el selector un poco más usable.

#### _Ideas (Selector)_

- En lugar de tener 2 selectores siempre visibles, mostrar sólo uno con las opciones:
  - Mes actual
  - Últimos 30 días
  - Este año
  - Histórico
  - Personalizado
    - Si seleccionamos esta opción, se muestra el calendario con el formato "range", para seleccionar un rango de fechas que queramos.

### Gráfica columnas

> Buscar librería para mostrar gráficas en modo columna y comparar datos de tipsters en este caso

## Backend

### Mejorar sistema de gestión de datos

> Actualmente, hacemos el login con google, y guardamos el usuario. Dentro de cada usuario, a cada tip o tipster que creamos hay que ponerle a que userId pertenece para que se haga el filtrado. Eso es una basura, se tiene que mejorar

Buscar alternativas para mejorar este sistema.

### Colección de payments

> Necesitamos una nueva colección en base de datos para los pagos que realizamos para los tipsters. De esa forma, éstos únicamente se verán en la pantalla de rentabilidad, dejando al margen la view de Tips

Hay que definir la estructura para la base de datos, el desarrollo del backend y la conexión desde la app.
