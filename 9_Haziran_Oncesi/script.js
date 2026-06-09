const kutu = document.getElementById('renkliKutu');
const renkler = ['blue', 'green', 'red'];
let renkIndeksi = 0;

function renkDegistir() {
    renkIndeksi = (renkIndeksi + 1) % renkler.length;
    kutu.style.backgroundColor = renkler[renkIndeksi];
}

setInterval(renkDegistir, 2000);
