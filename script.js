// ----- DATOS DE NIVELES y recursos
const NIVELES = {
  1: {
    zonas: [
      {id:'zona-lan', label:'LAN', accepts:['lan_pc','lan_laptop']},
      {id:'zona-wan', label:'WAN', accepts:['wan_router','wan_modem']},
      {id:'zona-seg', label:'SEGURIDAD', accepts:['firewall']}
    ],
    items: [
      {id:'n1_i1', type:'lan_laptop', name:'Laptop Corporativa', img:'https://www.hp.com/content/dam/sites/worldwide/personal-computers/commercial/business-computers/new-version/tab-laptop-desktop-4@2x.png', hint:'Equipo portátil de usuarios'},
      {id:'n1_i2', type:'lan_pc', name:'PC de Escritorio', img:'https://www.lacuracao.pe/media/catalog/product/s/y/symp165_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700', hint:'Equipo de mesa en oficina'},
      {id:'n1_i3', type:'wan_router', name:'Router Edge', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN1DgR21ES1-2hziMiuSsCNmwzNkRvJ74Anbn9SWgzSsSFlICrBLlKAs7YYrXFDpSbuSg&usqp=CAU', hint:'Equipo que conecta a Internet'},
      {id:'n1_i4', type:'firewall', name:'Firewall', img:'https://static.vecteezy.com/system/resources/previews/000/600/578/non_2x/network-firewall-icon-illustration-vector-on-white-background.jpg', hint:'Protege y filtra el tráfico'}
    ]
  },
  2: {
    zonas: [
      {id:'z-lan', label:'LAN', accepts:['lan_pc','lan_laptop','printer']},
      {id:'z-wan', label:'WAN', accepts:['wan_router','wan_modem']},
      {id:'z-server', label:'SERVIDOR', accepts:['server_rack','nas']},
      {id:'z-sec', label:'SEGURIDAD', accepts:['firewall','ids']}
    ],
    items: [
      {id:'n2_i1', type:'server_rack', name:'Servidor Rack', img:'https://jkimportacion.com/images/stories/virtuemart/product/dell_server_rack.jpg', hint:'Servidor central en rack'},
      {id:'n2_i2', type:'lan_pc', name:'PC Oficina', img:'https://img.datacentermarket.es/wp-content/uploads/2024/04/12105405/servidor-rack-2.jpeg', hint:'PC de escritorio'},
      {id:'n2_i3', type:'printer', name:'Impresora Red', img:'https://www.redusers.com/noticias/wp-content/uploads/2013/03/redes00001-613x450.jpg', hint:'Imprime desde la red'},
      {id:'n2_i4', type:'wan_router', name:'Router', img:'https://www.redeszone.net/app/uploads-redeszone.net/2017/08/componentes-de-un-router.jpg', hint:'Encamina hacia Internet'},
      {id:'n2_i5', type:'firewall', name:'Firewall Avanzado', img:'https://static.vecteezy.com/ti/gratis-vektor/t1/600578-netzwerk-firewall-symbol-abbildung-auf-weissem-hintergrund-vektor.jpg', hint:'Protección de borde'}
    ]
  },
  3: {
    zonas: [
      {id:'d-dc', label:'DATA CENTER', accepts:['server_blade','switch_core','nas']},
      {id:'d-sec', label:'SEGURIDAD', accepts:['firewall','ids','proxy']},
      {id:'d-lan', label:'LAN', accepts:['lan_pc','lan_laptop','printer']},
      {id:'d-wifi', label:'INALÁMBRICA', accepts:['ap','tablet']},
      {id:'d-dmz', label:'DMZ', accepts:['proxy','web_server']}
    ],
    items: [
      {id:'n3_i1', type:'server_blade', name:'Servidor Blade', img:'https://upload.wikimedia.org/wikipedia/commons/7/7c/IBM_bladecenter_%28front%29.jpg', hint:'Alta densidad en rack'},
      {id:'n3_i2', type:'switch_core', name:'Switch Core', img:'https://www.tiendadecomputoperu.com/images/C9200L-24T-4X-E.jpg', hint:'Switch de núcleo'},
      {id:'n3_i3', type:'firewall', name:'Firewall UTM', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNmtFEHiukZfbPApKap68sf2UZ8rreaWTgfA&s', hint:'Filtrado y protección'},
      {id:'n3_i4', type:'ap', name:'Punto Acceso', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK0x_-cYcOk4VuWm1TVqsLaj7-ZMmaeyxClA&s', hint:'Conecta dispositivos móviles'},
      {id:'n3_i5', type:'nas', name:'NAS', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaZ9jVTazdo88rs8vqPqaxSDeUdYOyZavAcQ&s', hint:'Almacenamiento en red'},
      {id:'n3_i6', type:'proxy', name:'Proxy/Web', img:'https://play-lh.googleusercontent.com/dQ713sV9JMVE2q8y6v_SftihL5Hw2yoSqiTIJ40rtMrSEmeMOb9oawSK8U-JKTJccce2', hint:'Publica servicios en DMZ'}
    ]
  }
};

// ----- ESTADO
let estado = {
  nivel: 1,
  tiempo: 60,
  score: 0,
  errorsInRow: 0,
  placed: 0,
  totalThisLevel: 0,
  locked: false,
  difficulty: 'facil',
  timerId: null
};

// ----- ELEMENTOS DOM
const pantallaInicio = document.getElementById('pantalla-inicio');
const pantallaReglas = document.getElementById('pantalla-reglas');
const pantallaJuego = document.getElementById('pantalla-juego');
const pantallaFin = document.getElementById('pantalla-fin');
const zonasCont = document.getElementById('zonas');
const dispositivosCont = document.getElementById('dispositivos');
const tiempoEl = document.getElementById('tiempo');
const puntajeEl = document.getElementById('puntaje');
const nivelEl = document.getElementById('nivel');
const mensajesEl = document.getElementById('mensajes');
const sndCorrect = document.getElementById('snd-correct');
const sndWrong = document.getElementById('snd-wrong');
const sndWin = document.getElementById('snd-win');

// ----- BOTONES
document.getElementById('btn-reglas').onclick = () => { pantallaInicio.classList.add('oculto'); pantallaReglas.classList.remove('oculto'); }
document.getElementById('btn-volver').onclick = () => { pantallaReglas.classList.add('oculto'); pantallaInicio.classList.remove('oculto'); }
document.getElementById('btn-iniciar').onclick = () => iniciarJuego();
document.getElementById('btn-reiniciar').onclick = () => location.reload();
document.getElementById('btn-menu').onclick = () => location.reload();
document.getElementById('btn-jugar-otra').onclick = () => location.reload();

// ----- FUNCIONES PRINCIPALES
function iniciarJuego(){
  estado.difficulty = document.getElementById('select-dificultad').value;
  // ajustar tiempo inicial por dificultad
  if(estado.difficulty === 'facil') estado.tiempo = 60;
  if(estado.difficulty === 'medio') estado.tiempo = 45;
  if(estado.difficulty === 'dificil') estado.tiempo = 30;

  pantallaInicio.classList.add('oculto');
  pantallaReglas.classList.add('oculto');
  pantallaJuego.classList.remove('oculto');

  estado.nivel = 1;
  estado.score = 0;
  cargarNivel(estado.nivel);
  actualizarUI();

  // timer general
  clearInterval(estado.timerId);
  estado.timerId = setInterval(()=>{
    if(!estado.locked){
      estado.tiempo--;
      tiempoEl.textContent = estado.tiempo;
      if(estado.tiempo <= 0){
        clearInterval(estado.timerId);
        terminarJuego(false);
      }
    }
  },1000);
}

function cargarNivel(num){
  const cfg = NIVELES[num];
  estado.placed = 0;
  estado.totalThisLevel = cfg.items.length;
  nivelEl.textContent = num;

  // crear zonas
  zonasCont.innerHTML = '';
  cfg.zonas.forEach(z=>{
    const div = document.createElement('div');
    div.className = 'zona';
    div.id = z.id;
    div.dataset.accepts = JSON.stringify(z.accepts);
    div.innerHTML = `<strong>${z.label}</strong><div style="font-size:12px;color:#6b7280;margin-top:6px">(Puede aceptar varios tipos)</div>`;
    div.addEventListener('dragover', e => e.preventDefault());
    div.addEventListener('drop', onDropZone);
    zonasCont.appendChild(div);
  });

  // crear dispositivos (mezclar orden)
  dispositivosCont.innerHTML = '';
  const shuffled = cfg.items.slice().sort(()=>Math.random()-0.5);
  shuffled.forEach(item=>{
    const wrap = document.createElement('div');
    wrap.className = 'item';
    wrap.id = item.id;
    wrap.draggable = true;
    wrap.dataset.type = item.type;
    wrap.dataset.hint = item.hint;
    wrap.innerHTML = `<img src="${item.img}" alt="${item.name}"><div style="font-weight:700;margin-top:6px;font-size:13px">${item.name}</div>`;
    wrap.addEventListener('dragstart', onDragStart);
    dispositivosCont.appendChild(wrap);
  });

  mensajesEl.textContent = 'Pista: ' + cfg.items[0].hint;
}

function onDragStart(e){
  if(estado.locked) { e.preventDefault(); return; }
  const id = e.currentTarget.id;
  e.dataTransfer.setData('text/plain', id);
  e.currentTarget.classList.add('dragging');
}

function onDropZone(e){
  if(estado.locked) return;
  const id = e.dataTransfer.getData('text/plain');
  const itemEl = document.getElementById(id);
  if(!itemEl) return;

  const zoneAccepts = JSON.parse(this.dataset.accepts);
  const type = itemEl.dataset.type;

  // validar
  if(zoneAccepts.includes(type)){
    // acierto (solo 1 vez): pegar, bloquear, sumar puntos
    this.classList.add('good');
    setTimeout(()=>this.classList.remove('good'),500);
    sndCorrect.currentTime = 0; sndCorrect.play().catch(()=>{});
    estado.score += 15;
    estado.errorsInRow = 0;
    estado.placed++;
    // queda fijo en la zona
    this.appendChild(itemEl);
    itemEl.draggable = false;
    itemEl.style.opacity = '0.6';
    itemEl.classList.remove('dragging');
    itemEl.classList.add('colocado');
  } else {
    // error
    this.classList.add('bad');
    setTimeout(()=>this.classList.remove('bad'),500);
    sndWrong.currentTime = 0; sndWrong.play().catch(()=>{});
    estado.score -= 7;
    estado.errorsInRow = (estado.errorsInRow || 0) + 1;
    mensajesEl.textContent = 'Error: lee la pista y piensa otra vez.';
    // penaliza tiempo leve (según dificultad)
    estado.tiempo -= (estado.difficulty === 'dificil' ? 4 : 2);
    if(estado.errorsInRow >= 3) activarBloqueo();
  }

  // actualizar UI y revisar avance
  puntajeEl.textContent = estado.score;
  const restantes = document.querySelectorAll('.item:not(.colocado)').length;
  if(restantes === 0){
    // subir de nivel o terminar
    if(estado.nivel < 3){
      estado.nivel++;
      mensajesEl.textContent = 'Nivel completado! Preparando siguiente nivel...';
      setTimeout(()=> cargarNivel(estado.nivel), 1000);
    } else {
      terminarJuego(true);
    }
  }
}

function activarBloqueo(){
  estado.locked = true;
  mensajesEl.textContent = '⛔ Bloqueado por 5s por errores seguidos';
  setTimeout(()=>{
    estado.locked = false;
    estado.errorsInRow = 0;
    mensajesEl.textContent = '';
  },5000);
}

function terminarJuego(won){
  clearInterval(estado.timerId);
  pantallaJuego.classList.add('oculto');
  pantallaFin.classList.remove('oculto');
  document.getElementById('titulo-final').textContent = won ? '¡GANASTE! Red completada' : 'Tiempo agotado';
  document.getElementById('texto-final').textContent = 'Puntaje: ' + estado.score;
  let med = '🔰 Intenta de nuevo';
  if(estado.score >= 180) med = '🏅 Oro';
  else if(estado.score >= 130) med = '🥈 Plata';
  else if(estado.score >= 90) med = '🥉 Bronce';
  document.getElementById('medalla-final').textContent = med;
  if(won){ sndWin.currentTime = 0; sndWin.play().catch(()=>{}); }
}

// actualizar UI inicial
function actualizarUI(){
  tiempoEl.textContent = estado.tiempo;
  puntajeEl.textContent = estado.score;
  nivelEl.textContent = estado.nivel;
}
