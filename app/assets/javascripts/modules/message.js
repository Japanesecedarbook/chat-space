$(function(){
  function buildHTML(message){
    if(message.image&&message.text){
      let html =`<div class="Message-items" data-message-id=${message.id}>
                    <div class="Message-items__name-box">
                      <div class="Message-items__name-box--name">
                        ${message.user_name}
                      </div>
                      <div class="Message-items__name-box--posting-time">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="Message">
                      <p class="Message__text">
                        ${message.text}
                      </p>
                      <img class="Message__image" src="${message.image}">
                    </div>
                  </div>`
                return html;
    }
    if(message.image){
      let html =`<div class="Message-items" data-message-id=${message.id}>
                      <div class="Message-items__name-box">
                        <div class="Message-items__name-box--name">
                          ${message.user_name}
                        </div>
                        <div class="Message-items__name-box--posting-time">
                          ${message.created_at}
                        </div>
                      </div>
                      <div class="Message">
                        <img class="Message__image" src="${message.image}">
                      </div>
                    </div>`
                  return html;
    }
    else{
      let html =`<div class="Message-items" data-message-id=${message.id}>
                  <div class="Message-items__name-box">
                    <div class="Message-items__name-box--name">
                      ${message.user_name}
                    </div>
                    <div class="Message-items__name-box--posting-time">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="Message">
                    <p class="Message__text">
                      ${message.text}
                    </p>
                  </div>
                </div>`
              return html;
    };
  }

  $('.Form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(post){
      let html = buildHTML(post)
      $('.Main-chat__message-list').append(html)
      $('.Main-chat__message-list').animate({ scrollTop: $('.Main-chat__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.Send-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.Send-btn').prop("disabled", false);
    });
  });
});