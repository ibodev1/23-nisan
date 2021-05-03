(function() {
  var COLORS, Confetti, NUM_CONFETTI, PI_2, canvas, confetti, context, drawCircle, i, range, resizeWindow, xpos;

  NUM_CONFETTI = 350;

  COLORS = [[85, 71, 106], [174, 61, 99], [219, 56, 83], [244, 92, 68], [248, 182, 70]];

  PI_2 = 2 * Math.PI;

  canvas = document.getElementById("world");

  context = canvas.getContext("2d");

  window.w = 0;

  window.h = 0;

  resizeWindow = function() {
    window.w = canvas.width = window.innerWidth;
    return window.h = canvas.height = window.innerHeight;
  };

  window.addEventListener('resize', resizeWindow, false);

  window.onload = function() {
    return setTimeout(resizeWindow, 0);
  };

  range = function(a, b) {
    return (b - a) * Math.random() + a;
  };

  drawCircle = function(x, y, r, style) {
    context.beginPath();
    context.arc(x, y, r, 0, PI_2, false);
    context.fillStyle = style;
    return context.fill();
  };

  xpos = 0.5;

  document.onmousemove = function(e) {
    return xpos = e.pageX / w;
  };

  window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
      return window.setTimeout(callback, 1000 / 60);
    };
  })();

  Confetti = class Confetti {
    constructor() {
      this.style = COLORS[~~range(0, 5)];
      this.rgb = `rgba(${this.style[0]},${this.style[1]},${this.style[2]}`;
      this.r = ~~range(2, 6);
      this.r2 = 2 * this.r;
      this.replace();
    }

    replace() {
      this.opacity = 0;
      this.dop = 0.03 * range(1, 4);
      this.x = range(-this.r2, w - this.r2);
      this.y = range(-20, h - this.r2);
      this.xmax = w - this.r;
      this.ymax = h - this.r;
      this.vx = range(0, 2) + 8 * xpos - 5;
      return this.vy = 0.7 * this.r + range(-1, 1);
    }

    draw() {
      var ref;
      this.x += this.vx;
      this.y += this.vy;
      this.opacity += this.dop;
      if (this.opacity > 1) {
        this.opacity = 1;
        this.dop *= -1;
      }
      if (this.opacity < 0 || this.y > this.ymax) {
        this.replace();
      }
      if (!((0 < (ref = this.x) && ref < this.xmax))) {
        this.x = (this.x + this.xmax) % this.xmax;
      }
      return drawCircle(~~this.x, ~~this.y, this.r, `${this.rgb},${this.opacity})`);
    }

  };

  confetti = (function() {
    var j, ref, results;
    results = [];
    for (i = j = 1, ref = NUM_CONFETTI; (1 <= ref ? j <= ref : j >= ref); i = 1 <= ref ? ++j : --j) {
      results.push(new Confetti());
    }
    return results;
  })();

  window.step = function() {
    var c, j, len, results;
    requestAnimationFrame(step);
    context.clearRect(0, 0, w, h);
    results = [];
    for (j = 0, len = confetti.length; j < len; j++) {
      c = confetti[j];
      results.push(c.draw());
    }
    return results;
  };

  step();

}).call(this);


window.addEventListener("mousemove", cursor);
window.addEventListener("mouseout", cursor_out);
window.addEventListener("mousedown", cursor_click);
window.addEventListener("mouseup", cursor_up);

var p = document.getElementById("p");
var button = document.querySelector("button");
var cursor_box = document.querySelector(".cursor");
var sira = button.getAttribute("data-sira");
var robot_acma_buton = document.getElementById("robot-acma-buton");
var robot = document.getElementById("robot")

function cursor(e) {
  cursor_box.style.display = "block";
  cursor_box.style.top = e.pageY + "px";
  cursor_box.style.left = e.pageX + "px";
}
function cursor_out() {
  cursor_box.style.display = "none";
  cursor_box.style.backgroundColor = "transparent";
}
function cursor_click() {
  cursor_box.style.backgroundColor = "black";
}

function cursor_up() {
  cursor_box.style.backgroundColor = "transparent";
}

function cevap() {
  sira++;
  button.setAttribute("data-sira", sira);
  if (sira == 1) {
    p.innerHTML = "Naber? Umarım iyisindir çünkü bu gün senin günün!";
    button.innerHTML = "iyi senden?";
  }
  else if(sira == 2) {
    p.innerHTML = "Bende iyiyim tesekkür ederim, 23 Nisan neden çok onemli ogrenmek istermisin?";
    button.innerHTML = "Evet! 23.";
  }
  else if(sira == 3) {
    p.innerHTML = "23 Nisan Mustafa Kemal Atatürk tarafından dünya çocuklarına armagan edilmistir. ";
    button.innerHTML = "Neden 23 Nisan?";
  }
  else if(sira == 4) {
    p.innerHTML = "Güzel soru! Türkiye Büyük Millet Meclisi 23 Nisan'da Kurulmustur.";
    button.innerHTML = "Tesekkür Ederim!";
  }
  else if(sira == 5) {
    p.innerHTML = "Ben tesekkür ederim, 23 Nisan çocuk bayramın kutlu olsun! :)";
    button.innerHTML = ":)";
  }
  else {
    console.log("hata");
  }

}

robot_acma_buton.addEventListener("click", () => {
  robot.classList.toggle("aktif");
});
