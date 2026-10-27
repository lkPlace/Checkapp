(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[`Sala`,`Montaje de mesas`,`Buffet`,`Bebidas`,`Cócteles`];function t(e){return e.normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).toLocaleLowerCase(`es`)}function n(e,n,r){let i=t(n).trim().split(/\s+/).filter(Boolean);return e.filter(e=>{if(r&&e.category!==r)return!1;if(i.length===0)return!0;let n=t([e.title,e.category,e.summary,...e.keywords,...e.steps].join(` `));return i.every(e=>n.includes(e))})}var r=`checkapp-stock`,i={Alimentos:`stock-images/food.svg`,Bebidas:`stock-images/drinks.svg`,Limpieza:`stock-images/cleaning.svg`,Menaje:`stock-images/tableware.svg`,Otros:`stock-images/other.svg`},a=[`Alimentos`,`Bebidas`,`Limpieza`,`Menaje`,`Otros`],o=[`ud.`,`kg`,`g`,`L`,`ml`,`cajas`],s={"ud.":`unidades`,kg:`kilos`,g:`gramos`,L:`litros`,ml:`mililitros`,cajas:`cajas`};function c(e){let t=e.name.trim(),n=e.location.trim();if(!t||t.length>80)throw Error(`El nombre debe tener entre 1 y 80 caracteres.`);if(!a.includes(e.category))throw Error(`La categoría seleccionada no es válida.`);if(!o.includes(e.unit))throw Error(`La unidad seleccionada no es válida.`);if(!Number.isFinite(e.quantity)||e.quantity<0)throw Error(`La cantidad debe ser un número igual o mayor que cero.`);if(!Number.isFinite(e.minimumQuantity)||e.minimumQuantity<0)throw Error(`El stock mínimo debe ser un número igual o mayor que cero.`);if(n.length>80)throw Error(`La ubicación no puede superar 80 caracteres.`);if(e.photo&&(!e.photo.startsWith(`data:image/jpeg;base64,`)||e.photo.length>15e5))throw Error(`La foto debe ser una imagen JPG válida y no superar el tamaño permitido.`);let r=e.defaultImage||i[e.category];if(!/^stock-images\/[a-z0-9-]+\.svg$/.test(r))throw Error(`La imagen predeterminada del producto no es válida.`);return{name:t,category:e.category,quantity:e.quantity,unit:e.unit,minimumQuantity:e.minimumQuantity,location:n,defaultImage:r,counted:e.counted??!0,...e.photo?{photo:e.photo}:{}}}function l(e){if(!e||typeof e!=`object`)return!1;let t=e;return Number.isInteger(t.id)&&(t.id??0)>0&&typeof t.name==`string`&&a.includes(t.category)&&typeof t.quantity==`number`&&typeof t.unit==`string`&&o.includes(t.unit)&&typeof t.minimumQuantity==`number`&&typeof t.location==`string`&&(t.defaultImage===void 0||typeof t.defaultImage==`string`&&/^stock-images\/[a-z0-9-]+\.svg$/.test(t.defaultImage))&&(t.counted===void 0||typeof t.counted==`boolean`)&&typeof t.updatedAt==`string`&&(t.photo===void 0||typeof t.photo==`string`&&t.photo.startsWith(`data:image/jpeg;base64,`)&&t.photo.length<=15e5)}function u(e){let t=JSON.parse(e);if(!Array.isArray(t)||!t.every(l))throw Error(`Los datos del inventario no tienen un formato válido.`);if(t.some(e=>{try{return c(e),!1}catch{return!0}}))throw Error(`Los datos del inventario contienen cantidades o campos no válidos.`);let n=t.map(e=>e.id);if(new Set(n).size!==n.length)throw Error(`El inventario contiene identificadores de producto duplicados.`);return t.map(e=>({...e,defaultImage:e.defaultImage??i[e.category],counted:e.counted??!0}))}function d(e){return e.normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).toLocaleLowerCase(`es`)}function f(e,t,n,r){let i=d(t).trim().split(/\s+/).filter(Boolean);return e.filter(e=>{if(n&&e.category!==n||r===`uncounted`&&e.counted||r===`out`&&(!e.counted||e.quantity!==0)||r===`low`&&(!e.counted||e.quantity===0||e.quantity>e.minimumQuantity))return!1;if(i.length===0)return!0;let t=d(`${e.name} ${e.category} ${e.location} ${e.unit}`);return i.every(e=>t.includes(e))})}function p(){return`
    <section id="login-screen" class="login-screen" aria-labelledby="login-title">
      <form id="login-form" class="login-card">
        <div class="brand-mark login-brand-mark">C</div>
        <p class="eyebrow">Acceso de usuarios</p>
        <h1 id="login-title">CheckApp</h1>
        <p class="login-copy">Introduce tu código personal para acceder a las tareas del equipo.</p>
        <input id="login-pin" name="pin" class="login-pin-input" type="password" inputmode="numeric" pattern="[0-9]{6}" minlength="6" maxlength="6" autocomplete="current-password" aria-label="Código de acceso de seis dígitos" required />
        <div class="pin-entry" aria-label="Código de acceso">
          <div id="pin-digits" class="pin-digits" aria-hidden="true">
            ${Array.from({length:6},(e,t)=>`<span class="pin-digit" data-pin-digit="${t}"></span>`).join(``)}
          </div>
          <div class="pin-keypad" aria-label="Teclado numérico">
            ${[`1`,`2`,`3`,`4`,`5`,`6`,`7`,`8`,`9`].map(e=>`<button type="button" class="pin-key" data-pin-key="${e}" aria-label="Número ${e}">${e}</button>`).join(``)}
            <span class="pin-key-spacer" aria-hidden="true"></span>
            <button type="button" class="pin-key" data-pin-key="0" aria-label="Número 0">0</button>
            <button type="button" class="pin-key pin-key-delete" data-pin-delete aria-label="Borrar último dígito">⌫</button>
          </div>
        </div>
        <p id="login-error" class="login-error" role="alert" hidden></p>
        <button class="primary-action" type="submit">Acceder</button>
        <p class="demo-account-note">Códigos iniciales: Administrador <strong>123456</strong> · Usuario <strong>000000</strong>.</p>
        <p class="demo-security-note">Los códigos iniciales son de demostración; cámbialos antes de usar CheckApp con el equipo.</p>
      </form>
    </section>

    <div id="app-shell" class="app-shell" hidden>
      <header class="topbar">
        <div class="brand-wrap">
          <div class="brand-mark">A</div>
          <div>
            <p class="brand-title">CheckApp</p>
            <p class="brand-subtitle">Gestión de tareas</p>
          </div>
        </div>

        <nav class="primary-nav" aria-label="Menú principal">
          <button class="nav-link is-active" type="button" data-show-daily-tasks aria-current="page">Tareas</button>
          <button class="nav-link" type="button" data-show-calendar data-admin-only hidden>Calendario</button>
          <button class="nav-link" type="button" data-show-library>Biblioteca</button>
          <button class="nav-link" type="button" data-show-stock data-admin-only hidden>Stock</button>
          <button class="nav-link" type="button" data-show-admin data-admin-only hidden>Administración</button>
        </nav>

        <div class="user-session">
          <span id="session-user"></span>
          <button class="logout-button" type="button" data-logout>Cerrar sesión</button>
        </div>
      </header>

      <main class="page">
        
        <section id="daily-checklist-section" class="daily-checklist-section" aria-labelledby="daily-checklist-title">
          <div class="section-header">
            <div>
              
              <h2 id="daily-checklist-title">Tareas del día</h2><span class="eyebrow">${m()}</span>
            </div>
            <div class="daily-header-actions">
              <button class="calendar-today-btn" type="button" data-enable-notifications>Activar avisos</button>
              <button class="primary-action" type="button" data-add-task data-admin-only>Añadir tarea</button>
            </div>
          </div>
          <div class="daily-progress-card">
            <div class="daily-progress-copy">
              <span id="daily-progress-count">0 de 0 tareas completadas</span>
              <strong id="daily-progress-percent">0%</strong>
            </div>
            <div class="daily-progress-track" role="progressbar" aria-label="Completado de las tareas de hoy" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
              <span id="daily-progress-fill"></span>
            </div>
          </div>
          <div id="deviation-panel" class="deviation-panel" hidden></div>
          <div id="daily-task-list" class="daily-task-list"></div>
        </section>

        <section id="library-section" class="library-section" aria-labelledby="library-title" hidden>
          <div class="section-header">
            <div>
              <p class="eyebrow">Guías del equipo</p>
              <h2 id="library-title">Biblioteca de servicio</h2>
              <p class="section-copy">Consulta procedimientos, presentaciones y recetas del equipo.</p>
            </div>
          </div>
          <div class="library-search-panel">
            <label for="library-search">
              Buscar en la biblioteca
              <input id="library-search" type="search" placeholder="Ej.: presentación de buffet, mojito, mesa de desayuno" autocomplete="off" />
            </label>
            <label for="library-category">
              Categoría
              <select id="library-category">
                <option value="">Todas las categorías</option>
                ${e.map(e=>`<option value="${e}">${e}</option>`).join(``)}
              </select>
            </label>
          </div>
          <p id="library-result-count" class="library-result-count" aria-live="polite"></p>
          <div id="library-articles" class="library-articles"></div>
        </section>

        <section id="stock-section" class="stock-section" aria-labelledby="stock-title" hidden>
          <div class="section-header">
            <div>
              <p class="eyebrow">Inventario del establecimiento</p>
              <h2 id="stock-title">Control de stock</h2>
              <p class="section-copy">Busca productos y consulta sus existencias y ubicación.</p>
            </div>
            <button class="primary-action" type="button" data-add-stock>Nuevo producto</button>
          </div>
          <p id="stock-error" class="calendar-error" role="alert" hidden></p>
          <p id="stock-initial-note" class="stock-initial-note" hidden></p>
          <div class="stock-summary" aria-label="Resumen del inventario">
            <article class="stock-summary-card">
              <span>Pend. recuento</span>
              <strong id="stock-uncounted-count">0</strong>
            </article>
            <article class="stock-summary-card low">
              <span>Stock bajo</span>
              <strong id="stock-low-count">0</strong>
            </article>
            <article class="stock-summary-card out">
              <span>Agotados</span>
              <strong id="stock-out-count">0</strong>
            </article>
          </div>
          <div class="stock-filters" aria-label="Buscar y filtrar productos">
            <label>
              Buscar producto o ubicación
              <input id="stock-search" type="search" placeholder="Ej.: café, bebidas, cámara fría" autocomplete="off" />
            </label>
            <label>
              Categoría
              <select id="stock-category">
                <option value="">Todas</option>
                ${a.map(e=>`<option value="${e}">${e}</option>`).join(``)}
              </select>
            </label>
          
            <label>
              Estado del stock
              <select id="stock-status-filter">
                <option value="all">Todos</option>
                <option value="low">Stock bajo</option>
                <option value="out">Agotados</option>
                <option value="uncounted">Pendientes de recuento</option>
              </select>
            </label>
            
          </div>
          <p id="stock-result-count" class="stock-result-count" aria-live="polite"></p>
          <div id="stock-list" class="stock-list"></div>
        </section>

        <section id="task-admin-section" class="task-admin-section" aria-labelledby="task-admin-title" hidden>
          <div class="section-header">
            <div>
              <p class="eyebrow">Panel de control</p>
              <h2 id="task-admin-title">Administración de tareas</h2>
              <p class="section-copy">Crea, revisa y organiza las tareas guardadas en este dispositivo.</p>
            </div>
            <div class="admin-actions">
              <button class="calendar-today-btn" type="button" data-export-tasks>Exportar archivo</button>
              <button class="calendar-today-btn" type="button" data-import-tasks>Importar archivo</button>
              <input id="task-import-file" type="file" accept="application/json,.json" hidden />
              <button class="primary-action" type="button" data-add-task data-admin-only>Nueva tarea</button>
            </div>
          </div>
          <p class="admin-storage-note">Puedes descargar una copia JSON y restaurarla después o en otro dispositivo. Importar reemplaza las tareas actuales.</p>
          <div class="admin-filters" aria-label="Filtros de tareas">
            <label>
              Buscar
              <input id="admin-search" type="search" placeholder="Título o descripción" />
            </label>
            <label>
              Periodo
              <select id="admin-period">
                <option value="">Todos</option>
                <option value="daily">Diarias</option>
                <option value="weekly">Semanales</option>
                <option value="monthly">Mensuales</option>
                <option value="eventual">Eventuales</option>
              </select>
            </label>
            <label>
              Estado
              <select id="admin-status">
                <option value="">Todos</option>
                <option value="pending">Pendientes</option>
                <option value="in-progress">En curso</option>
                <option value="completed">Completadas</option>
              </select>
            </label>
          </div>
          <div id="admin-task-list" class="admin-task-list"></div>
          <section class="user-admin-section" aria-labelledby="user-admin-title">
            <div class="section-header">
              <div>
                <p class="eyebrow">Accesos y permisos</p>
                <h3 id="user-admin-title">Cuentas y empleados</h3>
              </div>
              <p class="section-copy">Asigna un nombre a cada número de empleado y administra sus permisos.</p>
            </div>
            <form id="user-form" class="user-create-form">
              <label>Número de empleado<input name="username" type="text" minlength="3" maxlength="24" pattern="[a-zA-Z0-9]{3,24}" autocomplete="off" required /></label>
              <label>Nombre del empleado<input name="employeeName" type="text" maxlength="80" autocomplete="name" required /></label>
              <label>PIN (6 números)<input name="pin" type="password" inputmode="numeric" pattern="[0-9]{6}" minlength="6" maxlength="6" autocomplete="new-password" required /></label>
              <label>Rol<select name="role"><option value="user">Usuario</option><option value="admin">Administrador</option></select></label>
              <button class="primary-action" type="submit">Añadir usuario</button>
            </form>
            <div id="user-list" class="user-list"></div>
          </section>
        </section>

        <section id="calendar-section" class="planner-section" hidden>
          <div class="section-header">
            <div>
              <p class="eyebrow">Agenda</p>
              <h2>Listas por periodo</h2>
            </div>
            <p class="section-copy">Organiza la operación diaria y mantén un flujo ordenado.</p>
          </div>

          <div class="calendar-toolbar">
            <div class="calendar-navigation">
              <button class="calendar-nav-btn" type="button" data-month-shift="-1" aria-label="Mes anterior">‹</button>
              <button class="calendar-today-btn" type="button" data-calendar-today>Hoy</button>
              <button class="calendar-nav-btn" type="button" data-month-shift="1" aria-label="Mes siguiente">›</button>
              <h3 id="calendar-month" aria-live="polite"></h3>
            </div>
            <button class="primary-action" type="button" data-add-task data-admin-only>Añadir tarea</button>
          </div>

          <div class="calendar-weekdays" aria-hidden="true">
            <span>Lun</span><span>Mar</span><span>Mié</span><span>Jue</span><span>Vie</span><span>Sáb</span><span>Dom</span>
          </div>
          <div id="calendar-grid" class="calendar-grid" role="grid" aria-label="Calendario mensual"></div>

          <section class="selected-day-section" aria-live="polite">
            <div class="selected-day-heading">
              <div>
                <p class="eyebrow">Agenda del día</p>
                <h3 id="selected-date-title"></h3>
              </div>
              <span id="selected-task-count" class="selected-task-count"></span>
            </div>
            <div id="completion-groups" class="completion-groups" aria-label="Porcentaje de tareas completadas por grupo"></div>
            <div id="selected-task-list" class="task-list"></div>
          </section>
        </section>

        <dialog id="task-dialog" class="task-dialog">
          <form id="task-form" class="task-form">
            <div class="dialog-heading">
              <div>
                <p class="eyebrow">Calendario</p>
                <h2 id="task-dialog-title">Nueva tarea</h2>
              </div>
              <button class="dialog-close" type="button" data-close-dialog aria-label="Cerrar">×</button>
            </div>
            <label>
              Título
              <input name="title" type="text" maxlength="90" required />
            </label>
            <div class="form-row">
              <label>
                Fecha
                <input name="date" type="date" required />
              </label>
              <label>
                Hora
                <input name="time" type="time" required />
              </label>
            </div>
            <div class="form-row">
              <label>
                Periodicidad
                <select name="period">
                  <option value="daily">Diaria</option>
                  <option value="weekly">Semanal</option>
                  <option value="monthly">Mensual</option>
                  <option value="eventual">Eventual (una vez)</option>
                </select>
              </label>
              <label>
                Estado
                <select name="status">
                  <option value="Pendiente">Pendiente</option>
                  <option value="En curso">En curso</option>
                </select>
              </label>
            </div>
            <label>
              Descripción
              <textarea name="description" rows="3" maxlength="280"></textarea>
            </label>
            <label>
              Pasos de la checklist
              <textarea name="checklist" rows="4" placeholder="Un paso por línea&#10;Ejemplo: Revisar materiales y utensilios" required></textarea>
              <span class="form-help">Añade los pasos necesarios. La tarea se completa al marcarlos todos.</span>
            </label>
            <div class="dialog-actions">
              <button class="calendar-today-btn" type="button" data-close-dialog>Cancelar</button>
              <button class="primary-action" type="submit">Guardar tarea</button>
            </div>
          </form>
        </dialog>

        <dialog id="checklist-dialog" class="task-dialog checklist-dialog">
          <div id="checklist-dialog-content"></div>
        </dialog>

        <dialog id="stock-dialog" class="task-dialog stock-dialog">
          <form id="stock-form" class="task-form stock-form">
            <div class="dialog-heading">
              <div>
                <p class="eyebrow">Inventario</p>
                <h2 id="stock-dialog-title">Nuevo producto</h2>
              </div>
              <button class="dialog-close" type="button" data-close-stock-dialog aria-label="Cerrar">×</button>
            </div>
            <label>
              Nombre del producto
              <input name="name" type="text" maxlength="80" required />
            </label>
            <div class="form-row">
              <label>
                Categoría
                <select name="category" required>
                  ${a.map(e=>`<option value="${e}">${e}</option>`).join(``)}
                </select>
              </label>
              <label>
                Ubicación
                <input name="location" type="text" maxlength="80" placeholder="Ej.: Cámara de bebidas" />
              </label>
            </div>
            <div class="form-row stock-quantity-fields">
              <label>
                Cantidad disponible
                <input name="quantity" type="number" min="0" step="0.001" required />
              </label>
              <label>
                Unidad
                <select name="unit" required>
                  ${o.map(e=>`<option value="${e}">${s[e]}</option>`).join(``)}
                </select>
              </label>
              <label>
                Stock mínimo
                <input name="minimumQuantity" type="number" min="0" step="0.001" required />
              </label>
            </div>
            <label class="stock-counted-field">
              <input name="counted" type="checkbox" />
              Recuento físico realizado
            </label>
            <div class="stock-photo-field">
              <label for="stock-photo">Foto del producto</label>
              <div id="stock-photo-preview" class="stock-photo-preview" aria-live="polite"></div>
              <input id="stock-photo" name="photo" type="file" accept="image/*" capture="environment" />
              <span class="form-help">Obligatoria para productos nuevos. El catálogo incluye imágenes ilustrativas predeterminadas.</span>
            </div>
            <div class="dialog-actions">
              <button class="calendar-today-btn" type="button" data-close-stock-dialog>Cancelar</button>
              <button class="primary-action" type="submit">Guardar producto</button>
            </div>
          </form>
        </dialog>

        <div id="task-notification" class="task-notification" role="status" aria-live="polite" hidden></div>

      </main>
    </div>
  `}function m(){throw Error(`Function not implemented.`)}function h(e){return e.replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e])}function ee(t,{articles:r,search:i,category:a,resultCount:o}){if(!r||!i||!a||!o)return;let s=e.find(e=>e===a.value)??``,c=n(t,i.value,s);o.textContent=`${c.length} ${c.length===1?`guía`:`guías`}`,r.innerHTML=c.length?c.map(e=>`
        <article class="library-article">
          <div class="library-article-heading">
            <span class="library-category">${h(e.category)}</span>
            <h3>${h(e.title)}</h3>
          </div>
          <p class="library-article-summary">${h(e.summary)}</p>
          <ol>
            ${e.steps.map(e=>`<li>${h(e)}</li>`).join(``)}
          </ol>
          <div class="library-keywords" aria-label="Palabras clave">
            ${e.keywords.map(e=>`<span>${h(e)}</span>`).join(``)}
          </div>
        </article>
      `).join(``):`<p class="library-empty">No se encontraron guías. Prueba otras palabras o cambia la categoría.</p>`}function te(e,t,{list:n,search:r,category:i,statusFilter:o,resultCount:c,uncountedCount:l,lowCount:u,outCount:d,initialNote:p}){if(!n||!r||!i||!o||!c)return;if(!t){n.replaceChildren(),l&&(l.textContent=`0`),u&&(u.textContent=`0`),d&&(d.textContent=`0`);return}let m=e.filter(e=>!e.counted).length,ee=e.filter(e=>e.counted&&e.quantity>0&&e.quantity<=e.minimumQuantity).length,te=e.filter(e=>e.counted&&e.quantity===0).length;l&&(l.textContent=String(m)),u&&(u.textContent=String(ee)),d&&(d.textContent=String(te)),p&&(p.hidden=m===0,p.textContent=m===0?``:`Catálogo inicial: las existencias están pendientes de recuento y los mínimos son orientativos. Comprueba las cantidades y ajusta los mínimos antes de usar el inventario.`);let ne=a.find(e=>e===i.value)??``,g=[`all`,`low`,`out`,`uncounted`].find(e=>e===o.value)??`all`,_=f(e,r.value,ne,g).sort((e,t)=>e.category.localeCompare(t.category,`es`)||e.name.localeCompare(t.name,`es`));c.textContent=`${_.length} ${_.length===1?`producto`:`productos`}`,n.innerHTML=e.length===0?`
      <div class="stock-empty">
        <span aria-hidden="true">▧</span>
        <h3>El inventario está vacío</h3>
        <p>Añade tus productos, indica el stock mínimo y sube una foto para reconocerlos rápidamente.</p>
        <button class="primary-action" type="button" data-add-stock>Añadir primer producto</button>
      </div>
    `:_.length?_.map(e=>{let t=e.counted&&e.quantity===0,n=e.counted&&!t&&e.quantity<=e.minimumQuantity,r=e.counted?t?`Agotado`:n?`Stock bajo`:``:`Pendiente de recuento`,i=e.counted?t?`out`:n?`low`:`available`:`uncounted`,a=new Intl.NumberFormat(`es-ES`,{maximumFractionDigits:3});return`
          <article class="stock-item ${i}" data-stock-card="${e.id}">
            <div class="stock-item-product">
              <div class="stock-product-photo">
                <img src="${h(e.photo??`/${e.defaultImage}`)}" alt="Imagen de ${h(e.name)}" loading="lazy" />
              </div>
              <div class="stock-product-description">
                <h3>${h(e.name)}</h3>
                <span>${h(e.category)}</span>
              </div>
            </div>
            <div class="stock-item-quantity">
              <strong>${e.counted?`${a.format(e.quantity)} <span>${h(s[e.unit])}</span>`:`<span class="stock-unverified">Sin recuento</span>`}</strong>
              ${r&&e.counted?`<span class="stock-state ${i}">${r}</span>`:``}
            </div>
            <details class="stock-item-manage">
              <summary>Gestionar</summary>
              <div class="stock-item-manage-panel">
                <div class="stock-item-meta">
                  <span>Ubicación: ${h(e.location||`Sin indicar`)}</span>
                  <span>Mínimo: ${a.format(e.minimumQuantity)} ${h(s[e.unit])}</span>
                </div>
                <div class="stock-movement-controls" aria-label="Registrar movimiento de stock de ${h(e.name)}">
                  <label>
                    Cantidad
                    <input data-stock-adjustment type="number" min="0.001" step="0.001" value="1" aria-label="Cantidad a mover de ${h(e.name)}" />
                  </label>
                  <button type="button" class="stock-entry-button" data-stock-change="${e.id}" data-direction="in" ${e.counted?``:`disabled`}>Entrada</button>
                  <button type="button" class="stock-exit-button" data-stock-change="${e.id}" data-direction="out" ${e.counted?``:`disabled`}>Salida</button>
                </div>
                ${e.counted?``:`<small class="stock-count-required">Realiza el recuento antes de registrar movimientos.</small>`}
                <div class="stock-item-actions">
                  <button type="button" data-edit-stock="${e.id}">Editar</button>
                  <button type="button" class="admin-delete" data-delete-stock="${e.id}">Eliminar</button>
                </div>
              </div>
            </details>
          </article>
        `}).join(``):`<p class="stock-empty-filter">No hay productos que coincidan con esos filtros.</p>`}var ne=`andy-app-accounts`;function g(e){return/^\d{6}$/.test(e)}function _(e){let t=JSON.parse(e);if(!Array.isArray(t)||!t.every(e=>typeof e==`object`&&!!e&&typeof e.username==`string`&&/^[a-zA-Z0-9]{3,24}$/.test(e.username)&&(e.employeeName===void 0||typeof e.employeeName==`string`&&e.employeeName.trim().length>0&&e.employeeName.trim().length<=80)&&g(e.pin)&&(e.role===`admin`||e.role===`user`)))throw Error(`Los usuarios guardados no tienen un formato válido.`);let n=t.map(e=>e.username.toLocaleLowerCase());if(new Set(n).size!==n.length)throw Error(`Hay nombres de usuario duplicados.`);let r=t.map(e=>e.pin);if(new Set(r).size!==r.length)throw Error(`Cada usuario debe tener un código de acceso distinto.`);if(!t.some(e=>e.role===`admin`))throw Error(`Debe existir al menos un usuario administrador.`);return t.map(e=>({...e,employeeName:typeof e.employeeName==`string`?e.employeeName.trim():e.username}))}var re=`andy-app-calendar-tasks`;function v(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`}function y(e){let t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);if(!t)throw Error(`Fecha no válida: ${e}`);let[,n,r,i]=t,a=new Date(Number(n),Number(r)-1,Number(i));if(v(a)!==e)throw Error(`Fecha no válida: ${e}`);return a}function ie(e,t){let n=(new Date(e,t,1).getDay()+6)%7,r=new Date(e,t,1-n);return Array.from({length:42},(n,i)=>{let a=new Date(r);return a.setDate(r.getDate()+i),{date:a,dateKey:v(a),isCurrentMonth:a.getMonth()===t&&a.getFullYear()===e}})}function ae(e,t){return e.filter(e=>e.date===t).sort((e,t)=>e.time.localeCompare(t.time))}function oe(e,t){let n=t.getTime();return e.filter(e=>{if(e.completed)return!1;let t=y(e.date),[r,i]=e.time.split(`:`).map(Number);return t.setHours(r,i,0,0),t.getTime()<n}).sort((e,t)=>e.date.localeCompare(t.date)||e.time.localeCompare(t.time))}function se(e){return e.split(/\r?\n/).map(e=>e.trim()).filter(Boolean).map((e,t)=>({id:t+1,text:e,completed:!1}))}function ce(e){return[`daily`,`weekly`,`monthly`,`eventual`].map(t=>{let n=e.filter(e=>e.period===t),r=n.filter(e=>e.completed).length;return{period:t,total:n.length,completed:r,percentage:n.length===0?0:Math.round(r/n.length*100)}})}function b(e){if(!e||typeof e!=`object`)return!1;let t=e;if(typeof t.date!=`string`)return!1;try{y(t.date)}catch{return!1}return Number.isInteger(t.id)&&(t.period===`daily`||t.period===`weekly`||t.period===`monthly`||t.period===`eventual`)&&typeof t.title==`string`&&typeof t.time==`string`&&(t.status===`Pendiente`||t.status===`En curso`||t.status===`Listo`)&&(t.completed===void 0||typeof t.completed==`boolean`)&&typeof t.description==`string`&&(t.completedBy===void 0||typeof t.completedBy==`string`)&&(t.completedByName===void 0||typeof t.completedByName==`string`)&&(t.checklist===void 0||Array.isArray(t.checklist)&&t.checklist.every(e=>typeof e==`object`&&!!e&&Number.isInteger(e.id)&&typeof e.text==`string`&&typeof e.completed==`boolean`))}function le(e){let t=JSON.parse(e);if(!Array.isArray(t)||!t.every(b))throw Error(`Los datos guardados del calendario no tienen un formato válido.`);let n=t.map(e=>e.id);if(new Set(n).size!==n.length)throw Error(`El archivo contiene identificadores de tareas duplicados.`);return t.map(e=>{let t=e.completed??e.status===`Listo`,n=e.checklist?.length?e.checklist:[{id:1,text:`Revisar los materiales y el espacio de trabajo`,completed:t},{id:2,text:`Realizar la tarea: ${e.title}`,completed:t},{id:3,text:`Comprobar el resultado y dejar el área lista`,completed:t}];return{...e,completed:t,checklist:n}})}async function x(e,t=`GET`,n){let r=await fetch(`/api${e}`,{method:t,credentials:`same-origin`,cache:`no-store`,headers:{...n===void 0?{}:{"Content-Type":`application/json`},...t===`GET`||t===`HEAD`?{}:{"X-CheckApp-Request":`database-write`}},...n===void 0?{}:{body:JSON.stringify(n)}});if(r.status===204)return;let i=await r.json();if(!r.ok){let e=i&&typeof i==`object`&&`error`in i&&typeof i.error==`string`?i.error:`La solicitud falló (${r.status}).`;throw Error(e)}return i}var ue=document.querySelector(`#app`);if(ue){ue.innerHTML=p();let e=document.querySelector(`#login-screen`),t=document.querySelector(`#login-form`),n=document.querySelector(`#login-error`),s=document.querySelector(`#login-pin`),c=document.querySelector(`#pin-digits`),l=document.querySelector(`#app-shell`),d=document.querySelector(`#session-user`),f=document.querySelector(`#user-form`),m=document.querySelector(`#user-list`),g=[],b=null,S=()=>{c&&s&&c.querySelectorAll(`[data-pin-digit]`).forEach((e,t)=>{let n=s.value[t];e.textContent=n?`•`:``,e.classList.toggle(`is-filled`,!!n)})},de=document.querySelector(`#calendar-grid`),fe=document.querySelector(`#daily-checklist-section`),pe=document.querySelector(`#task-admin-section`),me=document.querySelector(`#calendar-section`),he=document.querySelector(`#library-section`),ge=document.querySelector(`#library-search`),_e=document.querySelector(`#library-category`),ve=document.querySelector(`#library-result-count`),ye=document.querySelector(`#library-articles`),be=document.querySelector(`#stock-section`),xe=document.querySelector(`#stock-search`),Se=document.querySelector(`#stock-category`),Ce=document.querySelector(`#stock-status-filter`),we=document.querySelector(`#stock-list`),Te=document.querySelector(`#stock-result-count`),Ee=document.querySelector(`#stock-uncounted-count`),De=document.querySelector(`#stock-low-count`),Oe=document.querySelector(`#stock-out-count`),ke=document.querySelector(`#stock-initial-note`),C=document.querySelector(`#stock-dialog`),w=document.querySelector(`#stock-form`),Ae=document.querySelector(`#stock-dialog-title`),T=document.querySelector(`#stock-photo`),je=document.querySelector(`#stock-photo-preview`),E=document.querySelector(`#admin-task-list`),Me=document.querySelector(`#admin-search`),Ne=document.querySelector(`#admin-period`),Pe=document.querySelector(`#admin-status`),Fe=document.querySelector(`#task-import-file`),Ie=document.querySelector(`#daily-task-list`),Le=document.querySelector(`#daily-progress-count`),Re=document.querySelector(`#daily-progress-percent`),ze=document.querySelector(`.daily-progress-track`),Be=document.querySelector(`#daily-progress-fill`),D=document.querySelector(`#selected-task-list`),Ve=document.querySelector(`#calendar-month`),He=document.querySelector(`#selected-date-title`),Ue=document.querySelector(`#selected-task-count`),We=document.querySelector(`#completion-groups`),O=document.querySelector(`#task-dialog`),k=document.querySelector(`#task-form`),Ge=document.querySelector(`#task-dialog-title`),A=document.querySelector(`#checklist-dialog`),j=document.querySelector(`#checklist-dialog-content`),Ke=document.querySelector(`#deviation-panel`),M=document.querySelector(`#task-notification`),qe=new Date,N=new Date(qe.getFullYear(),qe.getMonth(),1),P=v(qe),F=[],I=[],L=[],R=[],z=[],Je,Ye=0,B=null,V=null,H,U=e=>e===`daily`?`Diaria`:e===`weekly`?`Semanal`:e===`monthly`?`Mensual`:`Eventual`,W=(e,t=new Date)=>{if(e.completed)return!1;let n=y(e.date),[r,i]=e.time.split(`:`).map(Number);return n.setHours(r,i,0,0),n<t},Xe=(...e)=>{let t=new Map;for(let n of e.flat())t.set(`${n.id}:${n.date}`,n);return[...t.values()].sort((e,t)=>e.date.localeCompare(t.date)||e.time.localeCompare(t.time)||e.id-t.id)},Ze=()=>{let e=ie(N.getFullYear(),N.getMonth());return{from:e[0].dateKey,to:e[e.length-1].dateKey}},G=()=>b?.role===`admin`,K=()=>{m&&G()&&(m.innerHTML=g.map(e=>`
      <article class="user-row">
        <div>
          <strong>${h(e.employeeName)}</strong>
          <span>Número: ${h(e.username)}${e.username===b?.username?` · Sesión actual`:``}</span>
        </div>
        <label>
          Nombre del empleado
          <input data-employee-name="${h(e.username)}" type="text" maxlength="80" value="${h(e.employeeName)}" aria-label="Nombre del empleado ${h(e.username)}" required />
        </label>
        <button class="calendar-today-btn" type="button" data-save-employee-name="${h(e.username)}">Guardar nombre</button>
        <label>
          Rol
          <select data-user-role="${h(e.username)}" aria-label="Rol de ${h(e.username)}">
            <option value="user" ${e.role===`user`?`selected`:``}>Usuario</option>
            <option value="admin" ${e.role===`admin`?`selected`:``}>Administrador</option>
          </select>
        </label>
        ${e.username===b?.username?`<span class="user-current-label">Conectado</span>`:`<button type="button" class="admin-delete" data-remove-user="${h(e.username)}">Eliminar</button>`}
      </article>
    `).join(``))},q=e=>{(e===`admin`||e===`stock`||e===`calendar`)&&!G()?J(`Solo un administrador puede acceder a esa sección.`,`warning`):(fe&&(fe.hidden=e!==`tasks`),me&&(me.hidden=e!==`calendar`),he&&(he.hidden=e!==`library`),be&&(be.hidden=e!==`stock`),pe&&(pe.hidden=e!==`admin`),document.querySelectorAll(`.primary-nav .nav-link`).forEach(t=>{let n=t.hasAttribute(`data-show-daily-tasks`)&&e===`tasks`||t.hasAttribute(`data-show-calendar`)&&e===`calendar`||t.hasAttribute(`data-show-library`)&&e===`library`||t.hasAttribute(`data-show-stock`)&&e===`stock`||t.hasAttribute(`data-show-admin`)&&e===`admin`;t.classList.toggle(`is-active`,n),n?t.setAttribute(`aria-current`,`page`):t.removeAttribute(`aria-current`)}),window.scrollTo({top:0,behavior:`smooth`}))},Qe=(t=!0)=>{l&&e&&b&&(l.hidden=!1,e.hidden=!0,d&&(d.textContent=`${b.employeeName} · ${b.role===`admin`?`Administrador`:`Usuario`}`),document.querySelectorAll(`[data-admin-only]`).forEach(e=>{e.hidden=!G()}),document.querySelectorAll(`[data-add-task]`).forEach(e=>{e.hidden=!G()}),$(),Q(),K(),Y(),(t||!G())&&q(`tasks`))},J=(e,t=`success`)=>{M&&(M.textContent=e,M.className=`task-notification ${t}`,M.hidden=!1,window.clearTimeout(Je),Je=window.setTimeout(()=>{M.hidden=!0},6e3),t===`success`&&typeof Notification<`u`&&Notification.permission===`granted`&&new Notification(`CheckApp · Tarea completada`,{body:e}))},$e=()=>ee(z,{articles:ye,search:ge,category:_e,resultCount:ve}),Y=()=>te(R,G(),{list:we,search:xe,category:Se,statusFilter:Ce,resultCount:Te,uncountedCount:Ee,lowCount:De,outCount:Oe,initialNote:ke}),et=async(e=!0)=>{let t=await x(`/bootstrap`);b=t.user,F=t.tasks,z=t.library,R=t.stock??[],g=t.accounts??[],await X(),$e(),Qe(e),G()||q(`tasks`)},X=async()=>{let e=++Ye,{from:t,to:n}=Ze(),r=v(new Date),[i,a,o]=await Promise.all([x(`/tasks/occurrences?from=${t}&to=${n}`),r>=t&&r<=n?Promise.resolve({tasks:[]}):x(`/tasks/occurrences?from=${r}&to=${r}`),G()?x(`/tasks/history`):Promise.resolve({tasks:[]})]);e===Ye&&(L=o.tasks,I=Xe(i.tasks,a.tasks,L),ct(),$(),Q())},tt=async()=>{if(!G()||!(await x(`/migration/status`)).pending)return;let e=window.localStorage.getItem(ne),t=window.localStorage.getItem(re),n=window.localStorage.getItem(r);if(!e&&!t&&!n)return;let i={},a=[];e&&(i.accounts=_(e),a.push(`cuentas`)),t&&(i.tasks=le(t),a.push(`tareas`)),n&&(i.stock=u(n),a.push(`stock`)),window.confirm(`Se encontraron ${a.join(`, `)} guardados en este navegador. ¿Quieres importarlos a SQLite? Las secciones seleccionadas reemplazarán los datos compartidos equivalentes para todos los dispositivos.`)&&(await x(`/migration/local`,`POST`,i),e&&window.localStorage.removeItem(ne),t&&window.localStorage.removeItem(re),n&&window.localStorage.removeItem(r),J(`Se migraron ${a.join(`, `)} a la base de datos compartida.`))},nt=(e,t=`Otros`,n=i[t])=>{je&&(je.innerHTML=e?`<img src="${h(e)}" alt="Vista previa de la foto del producto" />`:`<img src="/${h(n)}" alt="" /><small>Imagen ilustrativa</small>`)},rt=async e=>{if(!e.type.startsWith(`image/`))throw Error(`Selecciona un archivo de imagen.`);if(e.size>8388608)throw Error(`La foto original no puede superar 8 MB.`);let t=await createImageBitmap(e);if(t.width*t.height>4e7)throw t.close(),Error(`La resolución de la imagen es demasiado grande.`);let n=Math.min(1,320/Math.max(t.width,t.height)),r=document.createElement(`canvas`);r.width=Math.max(1,Math.round(t.width*n)),r.height=Math.max(1,Math.round(t.height*n));let i=r.getContext(`2d`);if(!i)throw t.close(),Error(`No se pudo preparar la foto en este navegador.`);i.drawImage(t,0,0,r.width,r.height),t.close();let a=await new Promise((e,t)=>{r.toBlob(n=>{n?e(n):t(Error(`No se pudo optimizar la foto seleccionada.`))},`image/jpeg`,.76)});return new Promise((e,t)=>{let n=new FileReader;n.addEventListener(`load`,()=>{typeof n.result==`string`?e(n.result):t(Error(`No se pudo leer la foto optimizada.`))},{once:!0}),n.addEventListener(`error`,()=>t(Error(`No se pudo leer la foto seleccionada.`)),{once:!0}),n.readAsDataURL(a)})},it=e=>{if(!G()){J(`Solo un administrador puede gestionar el stock.`,`warning`);return}if(!C||!w)return;w.reset(),V=e??null;let t=e===void 0?void 0:R.find(t=>t.id===e);if(e!==void 0&&!t){J(`No se encontró el producto.`,`warning`),V=null;return}if(H=t?.photo,T&&(T.required=!t),t){let e=w.elements.namedItem(`name`),n=w.elements.namedItem(`category`),r=w.elements.namedItem(`location`),i=w.elements.namedItem(`quantity`),a=w.elements.namedItem(`unit`),o=w.elements.namedItem(`minimumQuantity`),s=w.elements.namedItem(`counted`);e instanceof HTMLInputElement&&(e.value=t.name),n instanceof HTMLSelectElement&&(n.value=t.category),r instanceof HTMLInputElement&&(r.value=t.location),i instanceof HTMLInputElement&&(i.value=String(t.quantity)),a instanceof HTMLSelectElement&&(a.value=t.unit),o instanceof HTMLInputElement&&(o.value=String(t.minimumQuantity)),s instanceof HTMLInputElement&&(s.checked=t.counted)}else{let e=w.elements.namedItem(`counted`);e instanceof HTMLInputElement&&(e.checked=!0)}Ae&&(Ae.textContent=t?`Editar producto`:`Nuevo producto`);let n=w.querySelector(`button[type="submit"]`);n&&(n.textContent=t?`Guardar cambios`:`Guardar producto`),nt(t?.photo,t?.category,t?.defaultImage),C.showModal()},at=e=>{J(`Tarea completada: ${e.title}`)},ot=()=>{if(!Ke)return;let e=v(new Date),t=oe(G()?L:I.filter(t=>t.date===e),new Date).slice(-10).reverse();Ke.hidden=t.length===0,Ke.innerHTML=t.length?`
        <div class="deviation-heading">
          <div>
            <p class="eyebrow">Revisión necesaria</p>
            <h3>${t.length} ${t.length===1?`tarea retrasada`:`tareas retrasadas`}</h3>
            <p>Revisa cada checklist y confirma materiales, presentación y condiciones del servicio.</p>
          </div>
          <span class="deviation-indicator" aria-hidden="true">!</span>
        </div>
        <ul class="deviation-list">
          ${t.map(e=>`
                <li>
                  <span><strong>${h(e.title)}</strong><small>${new Intl.DateTimeFormat(`es-ES`,{dateStyle:`medium`}).format(y(e.date))} · ${h(e.time)}</small></span>
                  <button type="button" data-open-checklist="${e.id}" data-occurrence-date="${e.date}">${G()?`Reabrir checklist`:`Revisar checklist`}</button>
                </li>
              `).join(``)}
        </ul>
      `:``},st=(e,t)=>{if(!j)return;let n=I.find(n=>n.id===e&&n.date===t);if(!n){J(`No se encontró la tarea para revisar.`,`warning`),A?.close();return}let r=n.checklist.filter(e=>e.completed).length,i=n.checklist.length?Math.round(r/n.checklist.length*100):0;j.innerHTML=`
      <div class="task-form checklist-form">
        <div class="dialog-heading">
          <div>
            <p class="eyebrow">Guía paso a paso</p>
            <h2>${h(n.title)}</h2>
            <p class="checklist-description">${h(n.description)}</p>
          </div>
          <button class="dialog-close" type="button" data-close-checklist aria-label="Cerrar">×</button>
        </div>
        <div class="checklist-progress-copy">
          <span>${r} de ${n.checklist.length} pasos</span>
          <strong>${i}%</strong>
        </div>
        <div class="daily-progress-track" role="progressbar" aria-label="Pasos completados" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${i}">
          <span style="width: ${i}%"></span>
        </div>
        <ol class="guided-step-list">
          ${n.checklist.map(e=>`
                <li class="${e.completed?`is-completed`:``}">
                  <label>
                    <input type="checkbox" data-checklist-task="${n.id}" data-checklist-date="${n.date}" data-checklist-step="${e.id}" ${e.completed?`checked`:``} ${n.completed?`disabled`:``} />
                    <span class="guided-step-check" aria-hidden="true"></span>
                    <span>${h(e.text)}</span>
                  </label>
                </li>
              `).join(``)}
        </ol>
        <p class="checklist-completion-note" ${n.completed||W(n)?``:`hidden`}>${W(n)?`Ejecución vencida. El administrador puede reabrir su checklist original.`:`Checklist finalizada. La tarea está marcada como completada.`}</p>
        <div class="dialog-actions">
          <button class="calendar-today-btn" type="button" data-close-checklist>Cerrar</button>
        </div>
      </div>
    `},Z=(e,t)=>{A&&(st(e,t),A.open||A.showModal())},ct=()=>{if(!Ie||!Le||!Re||!ze||!Be)return;let e=ae(I,v(new Date)),t=e.filter(e=>e.completed).length,n=e.length===0?0:Math.round(t/e.length*100);Le.textContent=`${t} de ${e.length} tareas completadas`,Re.textContent=`${n}%`,ze.setAttribute(`aria-valuenow`,String(n)),Be.style.width=`${n}%`,ot(),Ie.innerHTML=e.length?`<div class="daily-task-table-wrap">
          <table class="daily-task-table">
            <thead>
              <tr>
                <th scope="col">Tarea</th>
                <th scope="col">Hora</th>
                <th scope="col">Grupo</th>
                <th scope="col">Guía</th>
                <th scope="col" class="daily-check-column">Check</th>
              </tr>
            </thead>
            <tbody>
              ${e.map(e=>`
                    <tr class="${e.completed?`is-completed`:``}">
                      <td>
                        <span class="daily-task-title">${h(e.title)}</span>
                        ${e.description?`<span class="daily-task-description">${h(e.description)}</span>`:``}
                      </td>
                      <td class="daily-task-time">${h(e.time)}</td>
                      <td><span class="label ${e.period}">${U(e.period)}</span></td>
                      <td><button type="button" class="guide-task-btn" data-open-checklist="${e.id}" data-occurrence-date="${e.date}">Checklist</button></td>
                      <td class="daily-check-column">
                        <label class="daily-task-check-cell">
                          <input type="checkbox" data-daily-task="${e.id}" data-occurrence-date="${e.date}" ${e.completed?`checked`:``} aria-label="${e.completed?`Desmarcar`:`Completar`} ${h(e.title)}" />
                          <span class="daily-task-checkmark" aria-hidden="true"></span>
                        </label>
                      </td>
                    </tr>
                  `).join(``)}
            </tbody>
          </table>
        </div>`:`<div class="daily-checklist-empty">
          <span class="empty-day-icon">✦</span>
          <h3>No hay tareas para hoy</h3>
          <p>Añade una tarea para empezar a organizar tu jornada.</p>
          <button type="button" data-add-task data-admin-only>Añadir tarea</button>
        </div>`},Q=()=>{if(!E)return;if(!G()){E.replaceChildren();return}let e=Me?.value.trim().toLocaleLowerCase(`es`)??``,t=Ne?.value??``,n=Pe?.value??``,r=[...F].filter(e=>!t||e.period===t).filter(t=>!e||`${t.title} ${t.description}`.toLocaleLowerCase(`es`).includes(e)).sort((e,t)=>e.date.localeCompare(t.date)||e.time.localeCompare(t.time)),i=L.filter(e=>!t||e.period===t).filter(e=>!n||(n===`completed`?e.completed:n===`pending`?!e.completed:e.status===`En curso`)).filter(t=>!e||`${t.title} ${t.description}`.toLocaleLowerCase(`es`).includes(e)).sort((e,t)=>t.date.localeCompare(e.date)||t.time.localeCompare(e.time)),a=i.length?`<div class="admin-table-wrap">
          <table class="admin-task-table">
            <thead><tr><th>Fecha</th><th>Hora</th><th>Tarea</th><th>Periodicidad</th><th>Estado</th><th>Pasos</th><th>Realizada por</th><th>Acción</th></tr></thead>
            <tbody>
              ${i.map(e=>{let t=W(e),n=e.completedByName??g.find(t=>t.username.toLocaleLowerCase()===e.completedBy?.toLocaleLowerCase())?.employeeName,r=e.completedBy?`${e.completedBy}${n?` · ${n}`:``}`:`—`;return`
                  <tr>
                    <td data-label="Fecha">${new Intl.DateTimeFormat(`es-ES`,{dateStyle:`medium`}).format(y(e.date))}</td>
                    <td data-label="Hora">${h(e.time)}</td>
                    <td data-label="Tarea"><strong>${h(e.title)}</strong></td>
                    <td data-label="Periodicidad">${U(e.period)}</td>
                    <td data-label="Estado">${t?`Vencida`:e.completed?`Completada`:e.status}</td>
                    <td data-label="Pasos">${e.checklist.filter(e=>e.completed).length}/${e.checklist.length}</td>
                    <td data-label="Realizada por">${h(r)}</td>
                    <td data-label="Acción" class="admin-row-actions">
                      <button type="button" data-open-checklist="${e.id}" data-occurrence-date="${e.date}">${t?`Reabrir checklist`:`Ver checklist`}</button>
                    </td>
                  </tr>
                `}).join(``)}
            </tbody>
          </table>
        </div>`:`<p class="admin-empty">Todavía no hay ejecuciones en el historial.</p>`;E.innerHTML=r.length?`<div class="admin-table-wrap">
          <table class="admin-task-table">
            <thead><tr><th>Fecha de inicio</th><th>Hora</th><th>Tarea</th><th>Periodicidad</th><th>Checklist</th><th>Acciones</th></tr></thead>
            <tbody>
              ${r.map(e=>`
                <tr>
                  <td data-label="Fecha de inicio">${new Intl.DateTimeFormat(`es-ES`,{dateStyle:`medium`}).format(y(e.date))}</td>
                  <td data-label="Hora">${h(e.time)}</td>
                  <td data-label="Tarea"><strong>${h(e.title)}</strong><small>${h(e.description||`Sin descripción`)}</small></td>
                  <td data-label="Periodicidad"><span class="label ${e.period}">${U(e.period)}</span></td>
                  <td data-label="Checklist">${e.checklist.length} pasos</td>
                  <td data-label="Acciones" class="admin-row-actions">
                    <button type="button" data-edit-task="${e.id}">Editar</button>
                    <button type="button" class="admin-delete" data-admin-delete="${e.id}">Eliminar</button>
                  </td>
                </tr>
              `).join(``)}
            </tbody>
          </table>
        </div>`:`<p class="admin-empty">No hay tareas que coincidan con los filtros.</p>`,E.insertAdjacentHTML(`beforeend`,`
      <section class="task-history-section">
        <div class="section-header">
          <div>
            <p class="eyebrow">Ejecuciones por fecha</p>
            <h3>Historial de tareas</h3>
          </div>
          <p class="section-copy">Las tareas no realizadas quedan vencidas y se conservan aquí.</p>
        </div>
        ${a}
      </section>
    `)},lt=()=>{if(!D||!He||!Ue||!We)return;let e=y(P);He.textContent=new Intl.DateTimeFormat(`es-ES`,{weekday:`long`,day:`numeric`,month:`long`,year:`numeric`}).format(e);let t=ae(I,P);Ue.textContent=`${t.length} ${t.length===1?`tarea`:`tareas`}`,We.innerHTML=ce(t).map(e=>`
          <article class="completion-card">
            <div class="completion-card-heading">
              <span>${U(e.period)}</span>
              <strong>${e.percentage}%</strong>
            </div>
            <div
              class="completion-track"
              role="progressbar"
              aria-label="Completado ${U(e.period)}"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow="${e.percentage}"
            >
              <span style="width: ${e.percentage}%"></span>
            </div>
            <small>${e.completed} de ${e.total} completadas</small>
          </article>
        `).join(``),D.innerHTML=t.length?t.map(e=>`
              <article class="task-card ${e.completed?`is-completed`:``}">
                <div class="task-head">
                  <span class="label ${e.period}">${U(e.period)}</span>
                  <span class="status ${e.status.toLowerCase().replace(/\s+/g,`-`)}">${e.status}</span>
                </div>
                <button class="guide-task-btn" type="button" data-open-checklist="${e.id}" data-occurrence-date="${e.date}">${W(e)&&G()?`Reabrir tarea vencida`:`Abrir checklist`} · ${e.checklist.filter(e=>e.completed).length}/${e.checklist.length}</button>
                <label class="task-check">
                  <input type="checkbox" data-toggle-completion="${e.id}" data-occurrence-date="${e.date}" ${e.completed?`checked`:``} aria-label="Marcar ${h(e.title)} como completada" />
                  <span class="task-checkmark" aria-hidden="true"></span>
                  <span class="task-title">${h(e.title)}</span>
                </label>
                <p>${h(e.description)}</p>
                <div class="task-foot">
                  <span>${h(e.time)}</span>
                  ${G()?`<button class="delete-task-btn" type="button" data-delete-task="${e.id}" aria-label="Eliminar ${h(e.title)}">Eliminar</button>`:``}
                </div>
              </article>
            `).join(``):`<div class="empty-day"><span class="empty-day-icon">✦</span><p>No hay tareas para este día.</p>${G()?`<button type="button" data-add-task>Añadir una tarea</button>`:``}</div>`},$=()=>{if(!de||!Ve)return;Ve.textContent=new Intl.DateTimeFormat(`es-ES`,{month:`long`,year:`numeric`}).format(N);let e=v(new Date);de.innerHTML=ie(N.getFullYear(),N.getMonth()).map(t=>{let n=ae(I,t.dateKey),r=n.slice(0,2).map(e=>`<span class="calendar-event ${e.period}">${W(e)?`Vencida · `:``}${h(e.time)} · ${h(e.title)}</span>`).join(``),i=n.length>2?`<span class="calendar-more">+${n.length-2} más</span>`:``;return`
          <button class="${[`calendar-day`,t.isCurrentMonth?``:`outside-month`,t.dateKey===P?`selected`:``,t.dateKey===e?`today`:``].filter(Boolean).join(` `)}" type="button" role="gridcell" data-date="${t.dateKey}" aria-pressed="${t.dateKey===P}" aria-label="${new Intl.DateTimeFormat(`es-ES`,{dateStyle:`full`}).format(t.date)}${n.length?`, ${n.length} tareas`:``}">
            <span class="day-number">${t.date.getDate()}</span>
            <span class="calendar-events">${r}${i}</span>
          </button>
        `}).join(``),lt(),ct(),Q(),document.querySelectorAll(`[data-admin-only]`).forEach(e=>{e.hidden=!G()})},ut=e=>{if(!G()){J(`Solo un administrador puede gestionar las tareas.`,`warning`);return}if(!O||!k)return;k.reset(),B=e??null;let t=e===void 0?void 0:F.find(t=>t.id===e);if(e!==void 0&&(!t||t.completed)){J(t?`Las tareas completadas no se pueden editar.`:`No se encontró la tarea.`,`warning`),B=null;return}t&&(k.elements.namedItem(`title`).value=t.title,k.elements.namedItem(`date`).value=t.date,k.elements.namedItem(`time`).value=t.time,k.elements.namedItem(`period`).value=t.period,k.elements.namedItem(`status`).value=t.status,k.elements.namedItem(`description`).value=t.description,k.elements.namedItem(`checklist`).value=t.checklist.map(e=>e.text).join(`
`)),Ge&&(Ge.textContent=t?`Editar tarea`:`Nueva tarea`);let n=k.querySelector(`button[type="submit"]`);n&&(n.textContent=t?`Guardar cambios`:`Guardar tarea`);let r=k.elements.namedItem(`date`);!t&&r instanceof HTMLInputElement&&(r.value=P),O.showModal()};document.querySelectorAll(`[data-month-shift]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.dataset.monthShift);N=new Date(N.getFullYear(),N.getMonth()+t,1),P=v(N),$(),X().catch(e=>{J(e instanceof Error?e.message:`No se pudieron cargar las tareas del mes.`,`warning`)})})}),document.querySelector(`[data-calendar-today]`)?.addEventListener(`click`,()=>{let e=new Date;N=new Date(e.getFullYear(),e.getMonth(),1),P=v(e),$(),X().catch(e=>{J(e instanceof Error?e.message:`No se pudieron cargar las tareas de hoy.`,`warning`)})}),t?.addEventListener(`submit`,async e=>{if(e.preventDefault(),!t)return;let r=new FormData(t);try{let{user:e}=await x(`/auth/login`,`POST`,{pin:String(r.get(`pin`))});b=e,n&&(n.hidden=!0);try{await tt()}catch(e){J(e instanceof Error?`No se pudo migrar la copia local: ${e.message}`:`No se pudo migrar la copia local.`,`warning`)}await et(),t.reset()}catch(e){n&&(n.textContent=e instanceof Error?e.message:`No se pudo conectar con la base de datos.`,n.hidden=!1);let r=t.elements.namedItem(`pin`);r instanceof HTMLInputElement&&(r.value=``,S(),r.focus())}}),s?.addEventListener(`input`,()=>{s.value=s.value.replace(/\D/g,``).slice(0,6),S(),n&&(n.hidden=!0),s.value.length===6&&t?.requestSubmit()}),document.querySelector(`.pin-keypad`)?.addEventListener(`click`,e=>{let r=e.target;if(r instanceof Element&&s){if(r.closest(`[data-pin-delete]`))s.value=s.value.slice(0,-1);else{let e=r.closest(`[data-pin-key]`);if(!e?.dataset.pinKey||s.value.length>=6)return;s.value+=e.dataset.pinKey}S(),n&&(n.hidden=!0),s.value.length===6&&t?.requestSubmit()}}),document.querySelector(`[data-logout]`)?.addEventListener(`click`,async()=>{try{await x(`/auth/logout`,`POST`,{})}catch(e){J(e instanceof Error?`No se pudo cerrar la sesión en el servidor: ${e.message}`:`No se pudo cerrar la sesión.`,`warning`)}b=null,g=[],F=[],R=[],z=[],l&&(l.hidden=!0),e&&(e.hidden=!1),t&&t.reset(),n&&(n.hidden=!0),S(),O?.close(),A?.close(),C?.close(),window.scrollTo({top:0,behavior:`smooth`})}),f?.addEventListener(`submit`,async e=>{if(e.preventDefault(),!G()||!f)return;let t=new FormData(f);try{g=(await x(`/accounts`,`POST`,{username:String(t.get(`username`)),employeeName:String(t.get(`employeeName`)),pin:String(t.get(`pin`)),role:String(t.get(`role`))})).accounts,f.reset(),K(),J(`Usuario añadido.`)}catch(e){J(e instanceof Error?e.message:`No se pudo añadir el usuario.`,`warning`)}}),m?.addEventListener(`change`,async e=>{let t=e.target;if(t instanceof HTMLSelectElement&&t.dataset.userRole&&G())try{g=(await x(`/accounts/${encodeURIComponent(t.dataset.userRole)}/role`,`PATCH`,{role:t.value})).accounts,b&&=g.find(e=>e.username===b?.username)??null,G()||(L=[]),K(),Qe(!1),await X(),J(`Rol de usuario actualizado.`)}catch(e){J(e instanceof Error?e.message:`No se pudo cambiar el rol.`,`warning`),K()}}),m?.addEventListener(`click`,async e=>{let t=e.target;if(!(t instanceof Element)||!G())return;let n=t.closest(`[data-save-employee-name]`);if(n?.dataset.saveEmployeeName){let e=n.dataset.saveEmployeeName,t=m.querySelector(`[data-employee-name="${CSS.escape(e)}"]`);if(!t||!t.reportValidity())return;try{g=(await x(`/accounts/${encodeURIComponent(e)}/name`,`PATCH`,{employeeName:t.value})).accounts,b=g.find(e=>e.username===b?.username)??null,K(),Qe(!1),J(`Nombre del empleado actualizado.`)}catch(e){J(e instanceof Error?e.message:`No se pudo actualizar el nombre.`,`warning`)}return}let r=t.closest(`[data-remove-user]`)?.dataset.removeUser;if(r&&window.confirm(`¿Eliminar la cuenta "${r}"?`))try{g=(await x(`/accounts/${encodeURIComponent(r)}`,`DELETE`)).accounts,K(),J(`Se eliminó el usuario ${r}.`)}catch(e){J(e instanceof Error?e.message:`No se pudo eliminar el usuario.`,`warning`)}}),Ie?.addEventListener(`change`,async e=>{let t=e.target;if(!(t instanceof HTMLInputElement)||!t.dataset.dailyTask)return;let n=Number(t.dataset.dailyTask),r=t.dataset.occurrenceDate;if(!r)return;let i=I.find(e=>e.id===n&&e.date===r)?.completed??!1;try{await x(`/tasks/${n}/occurrences/${r}/completion`,`PATCH`,{completed:t.checked}),await X()}catch(e){J(e instanceof Error?e.message:`No se pudo completar la tarea.`,`warning`),ct();return}let a=I.find(e=>e.id===n&&e.date===r);!i&&a?.completed&&at(a)}),Ie?.addEventListener(`click`,e=>{let t=e.target;if(!(t instanceof Element))return;let n=t.closest(`[data-open-checklist]`);if(n?.dataset.openChecklist){let e=n.dataset.occurrenceDate;e&&Z(Number(n.dataset.openChecklist),e)}else t.closest(`[data-add-task]`)&&ut()}),de?.addEventListener(`click`,e=>{let t=e.target;if(!(t instanceof Element))return;let n=t.closest(`[data-date]`);if(!n?.dataset.date)return;P=n.dataset.date;let r=y(P);N=new Date(r.getFullYear(),r.getMonth(),1),$()}),document.querySelectorAll(`[data-add-task]`).forEach(e=>{e.addEventListener(`click`,()=>ut())}),document.querySelector(`[data-show-daily-tasks]`)?.addEventListener(`click`,()=>q(`tasks`)),document.querySelector(`[data-show-calendar]`)?.addEventListener(`click`,()=>q(`calendar`)),document.querySelector(`[data-show-library]`)?.addEventListener(`click`,()=>q(`library`)),document.querySelector(`[data-show-stock]`)?.addEventListener(`click`,()=>q(`stock`)),document.querySelector(`[data-show-admin]`)?.addEventListener(`click`,()=>q(`admin`)),ge?.addEventListener(`input`,$e),_e?.addEventListener(`change`,$e),xe?.addEventListener(`input`,Y),Se?.addEventListener(`change`,Y),Ce?.addEventListener(`change`,Y),be?.addEventListener(`click`,e=>{let t=e.target;t instanceof Element&&t.closest(`[data-add-stock]`)&&it()}),we?.addEventListener(`click`,async e=>{let t=e.target;if(!(t instanceof Element)||!G())return;let n=t.closest(`[data-edit-stock]`);if(n?.dataset.editStock){it(Number(n.dataset.editStock));return}let r=t.closest(`[data-delete-stock]`);if(r?.dataset.deleteStock){let e=Number(r.dataset.deleteStock),t=R.find(t=>t.id===e);if(!t||!window.confirm(`¿Eliminar "${t.name}" del inventario?`))return;try{R=(await x(`/stock/products/${e}`,`DELETE`)).stock,Y(),J(`Se eliminó ${t.name} del inventario.`)}catch(e){J(e instanceof Error?e.message:`No se pudo eliminar el producto.`,`warning`)}return}let i=t.closest(`[data-stock-change]`);if(!i?.dataset.stockChange||!i.dataset.direction)return;let a=Number(i.dataset.stockChange),o=i.closest(`[data-stock-card]`)?.querySelector(`[data-stock-adjustment]`),s=Number(o?.value);if(!Number.isFinite(s)||s<=0){J(`Indica una cantidad mayor que cero para registrar el movimiento.`,`warning`);return}let c=i.dataset.direction===`in`?s:-s;try{R=(await x(`/stock/products/${a}/movements`,`POST`,{change:c})).stock,Y(),J(c>0?`Entrada de stock registrada.`:`Salida de stock registrada.`)}catch(e){J(e instanceof Error?e.message:`No se pudo registrar el movimiento.`,`warning`)}}),w?.addEventListener(`change`,e=>{let t=e.target;if(t instanceof HTMLSelectElement&&t.name===`category`&&!H){let e=a.find(e=>e===t.value)??`Otros`;nt(void 0,e)}}),T?.addEventListener(`change`,async()=>{let e=T.files?.[0];if(!e)return;let t=H;try{H=await rt(e);let t=w?.elements.namedItem(`category`),n=t instanceof HTMLSelectElement?a.find(e=>e===t.value)??`Otros`:`Otros`;nt(H,n)}catch(e){H=t,T.value=``,nt(t),J(e instanceof Error?e.message:`No se pudo cargar la foto del producto.`,`warning`)}}),w?.addEventListener(`submit`,async e=>{if(e.preventDefault(),!G()||!w){J(`Solo un administrador puede gestionar el stock.`,`warning`);return}if(!w.reportValidity())return;let t=new FormData(w),n=a.find(e=>e===String(t.get(`category`))),r=o.find(e=>e===String(t.get(`unit`)));if(!n||!r){J(`Selecciona una categoría y una unidad válidas.`,`warning`);return}let s=V===null?void 0:R.find(e=>e.id===V),c=T?.files?.[0],l=H;if(c)try{l=await rt(c)}catch(e){J(e instanceof Error?e.message:`No se pudo cargar la foto del producto.`,`warning`);return}let u={name:String(t.get(`name`)),category:n,quantity:Number(t.get(`quantity`)),unit:r,minimumQuantity:Number(t.get(`minimumQuantity`)),location:String(t.get(`location`)),defaultImage:s?.category===n?s.defaultImage:i[n],counted:t.get(`counted`)===`on`,...l?{photo:l}:{}},d=V===null;try{R=(await x(V===null?`/stock/products`:`/stock/products/${V}`,V===null?`POST`:`PUT`,{product:u})).stock,w.reset(),C?.close(),V=null,H=void 0,Y(),J(d?`Producto guardado en el inventario.`:`Producto actualizado.`)}catch(e){J(e instanceof Error?e.message:`No se pudo guardar el producto.`,`warning`)}}),C?.addEventListener(`close`,()=>{V=null,H=void 0,w?.reset(),T&&(T.required=!0),Ae&&(Ae.textContent=`Nuevo producto`);let e=w?.querySelector(`button[type="submit"]`);e&&(e.textContent=`Guardar producto`)}),document.querySelectorAll(`[data-close-stock-dialog]`).forEach(e=>{e.addEventListener(`click`,()=>C?.close())}),document.querySelectorAll(`[data-close-dialog]`).forEach(e=>{e.addEventListener(`click`,()=>O?.close())}),document.querySelector(`[data-enable-notifications]`)?.addEventListener(`click`,async()=>{if(typeof Notification>`u`)J(`Este navegador no permite notificaciones del sistema.`,`warning`);else try{let e=await Notification.requestPermission();J(e===`granted`?`Avisos del navegador activados.`:`Los avisos del navegador no se activaron; seguirás viendo avisos dentro de la app.`,e===`granted`?`success`:`warning`)}catch(e){J(e instanceof Error?`No se pudieron activar los avisos del navegador: ${e.message}`:`No se pudieron activar los avisos del navegador.`,`warning`)}}),Me?.addEventListener(`input`,Q),Ne?.addEventListener(`change`,Q),Pe?.addEventListener(`change`,Q),E?.addEventListener(`click`,async e=>{let t=e.target;if(!(t instanceof Element))return;let n=t.closest(`[data-open-checklist]`),r=t.closest(`[data-edit-task]`),i=t.closest(`[data-admin-delete]`);if(n?.dataset.openChecklist&&n.dataset.occurrenceDate){if(!G())return;Z(Number(n.dataset.openChecklist),n.dataset.occurrenceDate)}else if(r?.dataset.editTask){if(!G())return;ut(Number(r.dataset.editTask))}else if(i?.dataset.adminDelete){if(!G())return;let e=Number(i.dataset.adminDelete),t=F.find(t=>t.id===e);if(!t||!window.confirm(`¿Eliminar la tarea "${t.title}"?`))return;try{F=(await x(`/tasks/${e}`,`DELETE`)).tasks,await X(),J(`Tarea eliminada.`)}catch(e){J(e instanceof Error?e.message:`No se pudo eliminar la tarea.`,`warning`)}}}),document.querySelector(`[data-export-tasks]`)?.addEventListener(`click`,()=>{if(G())try{let e=JSON.stringify(F,null,2),t=new Blob([e],{type:`application/json`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=`andy-app-tareas-${v(new Date)}.json`,r.click(),window.setTimeout(()=>URL.revokeObjectURL(n),1e3),J(`Copia de tareas descargada.`)}catch(e){J(e instanceof Error?`No se pudo exportar el archivo: ${e.message}`:`No se pudo exportar el archivo.`,`warning`)}}),document.querySelector(`[data-import-tasks]`)?.addEventListener(`click`,()=>{G()&&Fe?.click()}),Fe?.addEventListener(`change`,async()=>{if(!G())return;let e=Fe.files?.[0];if(e)try{let t=le(await e.text());if(!window.confirm(`El archivo contiene ${t.length} tareas. Reemplazará todas las tareas actuales. ¿Continuar?`))return;F=(await x(`/tasks`,`PUT`,{tasks:t})).tasks,await X(),J(`Se importaron ${F.length} tareas.`)}catch(e){J(e instanceof Error?`No se pudo importar el archivo: ${e.message}`:`No se pudo importar el archivo.`,`warning`)}finally{Fe.value=``}}),k?.addEventListener(`submit`,async e=>{if(e.preventDefault(),!G()){J(`Solo un administrador puede gestionar las tareas.`,`warning`);return}if(!k.reportValidity())return;let t=new FormData(k),n=String(t.get(`date`));y(n);let r={date:n,period:String(t.get(`period`)),title:String(t.get(`title`)).trim(),time:String(t.get(`time`)),status:String(t.get(`status`)),completed:!1,description:String(t.get(`description`)).trim(),checklist:se(String(t.get(`checklist`)))};if(!r.title)return;if(r.checklist.length===0){J(`Añade al menos un paso a la checklist.`,`warning`);return}try{let e=B;F=(await x(e===null?`/tasks`:`/tasks/${e}`,e===null?`POST`:`PUT`,{task:r})).tasks}catch(e){J(e instanceof Error?e.message:`No se pudieron guardar los cambios.`,`warning`);return}P=n;let i=y(n);N=new Date(i.getFullYear(),i.getMonth(),1),k.reset(),O?.close(),B=null;try{await X()}catch(e){J(e instanceof Error?e.message:`No se pudieron actualizar las tareas.`,`warning`)}}),O?.addEventListener(`close`,()=>{B=null,Ge&&(Ge.textContent=`Nueva tarea`);let e=k?.querySelector(`button[type="submit"]`);e&&(e.textContent=`Guardar tarea`)}),D?.addEventListener(`click`,async e=>{let t=e.target;if(!(t instanceof Element))return;let n=t.closest(`[data-delete-task]`),r=t.closest(`[data-open-checklist]`);if(r?.dataset.openChecklist){let e=r.dataset.occurrenceDate;e&&Z(Number(r.dataset.openChecklist),e)}else if(n?.dataset.deleteTask){if(!G())return;try{F=(await x(`/tasks/${Number(n.dataset.deleteTask)}`,`DELETE`)).tasks,await X()}catch(e){J(e instanceof Error?e.message:`No se pudo eliminar la tarea.`,`warning`)}}else t.closest(`[data-add-task]`)&&ut()}),D?.addEventListener(`change`,async e=>{let t=e.target;if(!(t instanceof HTMLInputElement)||!t.dataset.toggleCompletion)return;let n=Number(t.dataset.toggleCompletion),r=t.dataset.occurrenceDate;if(!r)return;let i=I.find(e=>e.id===n&&e.date===r)?.completed??!1;try{await x(`/tasks/${n}/occurrences/${r}/completion`,`PATCH`,{completed:t.checked}),await X()}catch(e){J(e instanceof Error?e.message:`No se pudo completar la tarea.`,`warning`),$();return}let a=I.find(e=>e.id===n&&e.date===r);!i&&a?.completed&&at(a)}),j?.addEventListener(`change`,async e=>{let t=e.target;if(!(t instanceof HTMLInputElement)||!t.dataset.checklistTask||!t.dataset.checklistDate||!t.dataset.checklistStep)return;let n=Number(t.dataset.checklistTask),r=t.dataset.checklistDate,i=I.find(e=>e.id===n&&e.date===r)?.completed??!1;try{await x(`/tasks/${n}/occurrences/${r}/checklist/${Number(t.dataset.checklistStep)}`,`PATCH`,{completed:t.checked}),await X()}catch(e){J(e instanceof Error?e.message:`No se pudo guardar el paso.`,`warning`);return}st(n,r);let a=I.find(e=>e.id===n&&e.date===r);!i&&a?.completed&&at(a)}),j?.addEventListener(`click`,e=>{let t=e.target;if(t instanceof Element){if(t.closest(`[data-close-checklist]`))A?.close();else{let e=t.closest(`[data-open-checklist]`);e?.dataset.openChecklist&&e.dataset.occurrenceDate&&Z(Number(e.dataset.openChecklist),e.dataset.occurrenceDate)}}}),Ke?.addEventListener(`click`,e=>{let t=e.target;if(!(t instanceof Element))return;let n=t.closest(`[data-open-checklist]`);n?.dataset.openChecklist&&n.dataset.occurrenceDate&&Z(Number(n.dataset.openChecklist),n.dataset.occurrenceDate)}),window.setInterval(ct,6e4);let dt=async()=>{try{let{user:e}=await x(`/auth/session`);if(!e){S();return}b=e,await et()}catch(e){n&&(n.textContent=e instanceof Error?`No se pudo conectar con la base de datos: ${e.message}`:`No se pudo conectar con la base de datos.`,n.hidden=!1)}},ft=async()=>{if(!(!b||O?.open||A?.open||C?.open))try{await et(!1)}catch(t){t instanceof Error&&t.message.includes(`Inicia sesión`)?(b=null,g=[],F=[],R=[],z=[],l&&(l.hidden=!0),e&&(e.hidden=!1)):J(t instanceof Error?`No se pudo actualizar la información compartida: ${t.message}`:`No se pudo actualizar la información compartida.`,`warning`)}};window.addEventListener(`focus`,()=>{ft()}),window.setInterval(()=>{ft()},15e3),dt()}