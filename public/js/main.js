$(document).ready(function () {
  /* vista splash por 4 segundos*/
  $('.splash').delay(1000).fadeOut('slow');

  var container = $('#container');
  

  function getNews() {
    var request = new XMLHttpRequest();
    request.open('GET', `https://examen-laboratoria-sprint-5.herokuapp.com/topics`);
    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        request.onload = addNews;
      }
    };
    request.send();
  }

  function addNews() {
    const data = JSON.parse(this.responseText);
    console.log(data);
    data.forEach(function (element) {
      const tema = element.content;
      const estructura = `<div class="row"><div class="col-xs-12 container-foro"><p class="user-name"><img src="assets/img/user.png" class="img-user">${element.author_name}</p><p>${tema}</p><p><img src="assets/img/mesage.png" class="img-message">${element.responses_count}</p></div></div>`
      container.append(estructura);
    });
  }

  function mostrar() {
    container.empty();
    var request = new XMLHttpRequest();
    request.open('GET', 'https://examen-laboratoria-sprint-5.herokuapp.com/topics');
    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        // console.log('Status:', this.status);
        // console.log('Headers:', this.getAllResponseHeaders());
        // console.log('Body:', this.responseText);
        request.onload = addNews;
      }
    };
    request.send();
  }

  function buscar() {
    console.log('hooa')
    var nameForo = $('#buscar-foro').val();
    const data = JSON.parse(this.responseText);
    data.forEach(function (element) {
      console.log(nameForo);
      if (nameForo === element.content) {
        console.log('aqui');
        console.log(element.content)
        var request = new XMLHttpRequest();
        var topic_id = element.id;
        request.open('GET', 'https://examen-laboratoria-sprint-5.herokuapp.com/topics/' + topic_id);

        request.onreadystatechange = function () {
          if (this.readyState === 4) {
            // console.log('Status:', this.status);
            // console.log('Headers:', this.getAllResponseHeaders());
            // console.log('Body:', this.responseText);
            request.onload = function () {
              // console.log(element.content);
              const estructura = `<div class="row"><div class="col-xs-12 container-foro"><p class="user-name"><img src="assets/img/user.png" class="img-user">${element.author_name}</p><p>${element.content}</p><p><img src="assets/img/mesage.png" class="img-message">${element.responses_count}</p><div id="commenting"></div><div id="form" class="ocultar"><input id="inputComment" type="text"> <br> <button id="btnComment">send comment</button></div><button id="newComment" data-id="${element.id}" class="btn btn-outline-secondary" type="button" id="respuesta">Crear respuesta</button></div></div>`
              container.append(estructura);
              $('#newComment').one('click', function () {
                var idtema = $(this).data('id');
                console.log(idtema);
                $('#form').removeClass('ocultar');
              });
              $('#btnComment').one('click', function () {
                console.log('idtema');
                $('#form').addClass('ocultar');
              });
            };
          }
        };
        request.send();
      }
    });
  }

  $('#btn-buscar').click(function () {
    container.empty();
    var request = new XMLHttpRequest();
    request.open('GET', `https://examen-laboratoria-sprint-5.herokuapp.com/topics`);
    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        console.log('entré');
        request.onload = buscar;
      }
    };
    request.send();
  });

  $('#btn-todos').click(function () {
    mostrar();
  });

  $('#crear').click(function(){
    var autor = $('#autor').val();
    var mensaje = $('#mensaje').val();
    if (autor !== '' && mensaje !== '') {
      var request = new XMLHttpRequest();
      request.open('POST', 'https://examen-laboratoria-sprint-5.herokuapp.com/topics');
      request.setRequestHeader('Content-Type', 'application/json');
      request.onreadystatechange = function () {
        if (this.readyState === 4) {
          // console.log('Status:', this.status);
          // console.log('Headers:', this.getAllResponseHeaders());
          // console.log('Body:', this.responseText);
        }
      };

      var body = {
        'author_name': autor,
        'content': mensaje,
      };

      request.send(JSON.stringify(body));
      $('#autor').val('');
      $('#mensaje').val('');
      container.empty();
      getNews();
    }
  });
});
