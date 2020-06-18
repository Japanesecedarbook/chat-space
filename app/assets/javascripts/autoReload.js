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
  
  let reloadMessages = function() {
    let last_message_id = $('.Message-items:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.Main-chat__message-list').append(insertHTML);
        $('.Main-chat__message-list').animate({ scrollTop: $('.Main-chat__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});