function Send(e) {
    if(e.keyCode == 13) {
        perguntar();
        return false;
    }
}

function perguntar() {
    const Input = document.getElementById('input');
    const question = Input.value.toString().trim();

    const msg = document.getElementById('msg');
    const code_user = document.getElementById('code_user');
    const code_before = document.getElementById('code_before');

    let msgLines = msg.innerHTML;
    msgLines = msgLines.replace('<a href="#" id="end">', '');
    const codeUser = Number(code_user.value);
    const codeBefore = Number(code_before.value);

    const http = new XMLHttpRequest();
    http.open('GET', 
   `/chatbot/question?code_user=${codeUser}&code_before=${codeBefore}&input=${question}`, true);
    http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {
        if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            let objJSON = JSON.parse(http.responseText);
            if(objJSON.length>0) {
                code_before.value = objJSON[0].code_current;

                const input = objJSON[0].input.toString().trim();
                const output = objJSON[0].output.toString().trim();

                msgLines +=
                `
             <div class="talk-bubble tri-right right-top" 
                  style="width: 90%; background-color: #8000ff;">
               <div class="talktext">
                 <p>${input}</p>
               </div>
             </div>

             <div class="talk-bubble tri-right left-top" 
                  style="width: 90%; background-color: #00aabb;">
               <div class="talktext">
                 <p>${output}</p>
               </div>
             </div>

             <a href="#" id="end">
                `;
                document.getElementById('input').value = '';
                msg.innerHTML = msgLines;
                window.location.href = '#end';
                document.getElementById('input').focus();
            }
        }
    }
    http.send();	   			
}
window.location.href = '#end';