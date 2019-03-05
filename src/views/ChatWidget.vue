<template>
    <div class="container" v-if="username">
        <div class="row">
            <div class="col-md-5">
                <div class="panel panel-primary">
                    <div class="panel-heading" id="accordion">
                        <span class="glyphicon glyphicon-comment"></span> Chat
                        <div class="btn-group pull-right">
                            <a type="button" class="btn btn-default btn-xs" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
                                <span class="glyphicon glyphicon-chevron-down"></span>
                            </a>
                        </div>
                    </div>
                <div class="panel-collapse collapse" id="collapseOne">
                    <div class="panel-body">
                        <ul class="chat">
                            <li class="left clearfix" v-for="message in messages"  v-if="message.username !== username"><span class="chat-img pull-left">
                                <img src="http://placehold.it/50/55C1E7/fff&text=U" alt="User Avatar" class="img-circle"/>
                            </span>
                                <div class="chat-body clearfix">
                                    <div class="header">
                                        <strong class="primary-font">{{message.username}}</strong> <small class="pull-right text-muted">
                                            <span class="glyphicon glyphicon-time"></span>{{timeSince(new Date(message.time))}} ago</small>
                                    </div>
                                    <p>
                                        {{message.text}}
                                    </p>
                                </div>
                            </li>
                            <li class="right clearfix" v-else><span class="chat-img pull-right">
                                <img src="http://placehold.it/50/FA6F57/fff&text=ME" alt="User Avatar" class="img-circle" />
                            </span>
                                <div class="chat-body clearfix">
                                    <div class="header">
                                        <small class=" text-muted"><span class="glyphicon glyphicon-time"></span>{{timeSince(new Date(message.time))}} ago</small>
                                        <strong class="pull-right primary-font">{{message.username}}</strong>
                                    </div>
                                    <p>
                                        {{message.text}}
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="panel-footer">
                        <div class="input-group">
                            <form type="submit">
                                <input id="btn-input" type="text" class="form-control input-sm" placeholder="Type your message here..." v-model="chatContent"/>
                                <span class="input-group-btn">
                                    <button class="btn btn-warning btn-sm" id="btn-chat" v-on:click.prevent="sendMessage()">
                                        Send</button>
                                </span>
                            </form>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style>
.chat
{
    list-style: none;
    margin: 0;
    padding: 0;
}

.chat li
{
    margin-bottom: 10px;
    padding-bottom: 5px;
    border-bottom: 1px dotted #B3A9A9;
}

.chat li.left .chat-body
{
    margin-left: 60px;
}

.chat li.right .chat-body
{
    margin-right: 60px;
}


.chat li .chat-body p
{
    margin: 0;
    color: #777777;
}

.panel .slidedown .glyphicon, .chat .glyphicon
{
    margin-right: 5px;
}

.panel-body
{
    overflow-y: scroll;
    height: 250px;
}

::-webkit-scrollbar-track
{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
}

::-webkit-scrollbar
{
    width: 12px;
    background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb
{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #555;
}

</style>

<script>
  import fire from '@/fire.js'

  export default {
    data() {
      return {
        username: localStorage.user,
        messages: [],
        chatContent: ''
      }
    },

    methods: {

      sendMessage(e) {
        if(this.chatContent){
          const message = {
            username: this.username,
            text: this.chatContent,
            time: Date.now(),
          }

          //To-Do: Push message to firebase
          console.log(message)
          fire.database().ref('messages').push(message);

        }
      },

      timeSince(date) {

        var seconds = Math.floor((new Date() - date) / 1000);

        var interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return interval + " years";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes";
        }
        return Math.floor(seconds) + " seconds";
        }
    },

    mounted(){    
      let vm = this;
      const itemsRef = fire.database().ref('messages');

      itemsRef.on('value', snapshot => {
        let data = snapshot.val();
        let messages = [];

        Object.keys(data).forEach(key => {
          messages.push({
            id: key,
            username: data[key].username,
            text: data[key].text,
            time: data[key].time
          })
        })

        vm.messages = messages;
      })
    },
  }

</script>
