        $('.cover button').on('click', function() {
            var name = $('#name-input').val();
            var pass = $('#password-input').val();
            if(name == "test@acadview.com" && pass == "JavascriptRocks")//user gets access only if username input value is greater than or equal to 2 
            {
                //var message = "Welcome, " + name;
                //$('.main .user-name').text(message);
                $('.cover').addClass('hidden');
                $('.main').removeClass('hidden');
            }
            else
            {
                $('#name-input').addClass('error');
                $('#password-input').addClass('error');
                alert("Username should be more than 3 chars");
            }
        });

        var currentSongNumber = 1;
        var willLoop = 0;
        var willShuffle = 0;

        //function to manage the play and pause interface using the fontawesome icons
        function toggleSong(){
            var song = document.querySelector('audio');
            if (song.paused == true) {
                $('.play-icon').removeClass('fa-play').addClass('fa-pause');//removes play icon and adds pause icon
                song.play();
            } 
            else {
                $('.play-icon').removeClass('fa-pause').addClass('fa-play');//removes pause icon and adds play icon
                song.pause();
            }
        }

        function stepForward(){
            //code (mandatory)
        }
        function stepbackward(){
            //code (mandatory)
        }

        $('.play-icon').on('click', function() {
            toggleSong();
        });

        $('.fa-step-forward').on('click',function(){
            
        });

        //function to manage the play and pause functionality using the spacebar(keyboard keys)
        $('body').on('keypress',function(event){
            var target = event.target;
            if(event.keyCode == 32 && target.tagName!='INPUT') //spacebar key holds value 32
            {
                toggleSong();
            }
        });
        
        //made an object and stored the complete info about all the songs
        //var allSongs=[songs1,songs2]//,songs3,songs4,songs5,songs6,songs7,songs8];
        //songs=[0,1,2,3];
        var songs = [{
                'name': 'Aye Dil Bata',
                'artist': 'Arijit Singh',
                'album': 'Ishq Actually',
                'duration': '5:42',
               'fileName': 'song1.mp3',
               'image' : 'song1.jpg'
            },
            {
                'name': 'Jaaniya O Jaaniya',
                'artist': 'Sidharth Basrur',
                'album': 'Haunted',
                'duration': '5:07',
                'fileName': 'song2.mp3',
                'image' : 'song2.jpg'
            },
            {
                'name': 'Safarnama',
                'artist': 'Lucky Ali',
                'album': 'Tamasha',
                'duration': '4:11',
                'fileName': 'song3.mp3',
                'image' : 'song3.jpg'
            },
            {
                'name': 'Why Not Me',
                'artist': 'Enrique Iglesias',
                'album': 'Euphoria',
                'duration': '3:38',
                'fileName': 'song4.mp3',
                'image' : 'song4.jpg'
            }]
        var songs2 =[{  'name': 'song1',
                       'artist': 'Arijit Singh',
                       'album': 'Ishq Actually',
                       'duration': '5:42',
                       'fileName': 'song3.mp3',
                       'image' : 'song3.jpg'
                },
                {    'name': 'song2',
                     'artist': 'song3',
                     'album': 'Haunted',
                     'duration': '5:07',
                     'fileName': 'song4.mp3',
                     'image' : 'song4.jpg'
                },
                    {'name': 'song3',
                'artist': 'Lucky Ali',
                'album': 'Tamasha',
                'duration': '4:11',
                'fileName': 'song1.mp3',
                'image' : 'song1.jpg'
            },
            {
                'name': 'song4',
                'artist': 'Enrique Iglesias',
                'album': 'Euphoria',
                'duration': '3:38',
                'fileName': 'song2.mp3',
                'image' : 'song2.jpg'
            }]

        // var mood2=document.querySelector('.mood2');
        // mood2.addEventListener('click',function(){
        //     splfunction();
        // });
        // function splfunction(){
        //     changeCurrentSongDetails(songs2[0]);
        //     // var song = document.querySelector('audio');
        //     // song.src=songs2[0].fileName;
        //     for(var i =0; i < songs2.length;i++) {
        //             //using the songs object to fill in all the details
        //         var obj = songs2[i];
        //         var name = '#song' + (i+1);
        //         var song = $(name);
        //         song.find('.song-name').text(obj.name);
        //         song.find('.song-artist').text(obj.artist);
        //         song.find('.song-album').text(obj.album);
        //         song.find('.song-length').text(obj.duration);
        //         addSongNameClickEvent(obj,i+1)
        //     }
        // }

        function fancyTimeFormat(time)
        {   
            // Hours, minutes and seconds
            var hrs = ~~(time / 3600);
            var mins = ~~((time % 3600) / 60);
            var secs = time % 60;

            // Output like "1:01" or "4:03:59" or "123:03:59"
            var ret = "";

            if (hrs > 0) {
                ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
            }

            ret += "" + mins + ":" + (secs < 10 ? "0" : "");
            ret += "" + secs;
            return ret;
        }

        //updates the current time and the duration of the songs.
        function updateCurrentTime(){ 
            var song = document.querySelector('audio');
            var currentTime = Math.floor(song.currentTime);//removes digits present after decimal
            var duration = Math.floor(song.duration);//same as above
            var bar=(currentTime*100)/duration;//for progres bar 
            currentTime = fancyTimeFormat(currentTime);
            duration = fancyTimeFormat(duration)
            $('.time-elapsed').text(currentTime);
            $('.song-duration').text(duration);
            Progressbar(bar);
        }

        function Progressbar(bar){
          var prog = document.querySelector('.progress-filled');
          prog.style.width= bar +"%";
          //console.log(bar);
        }
        $('.player-progress').click(function(event){
            var $this=$(this);
            var selectedLength= event.pageX-$this.offset().left;
            var totalLength=$this.width();
            var width=(selectedLength/totalLength)*100;
            var song=document.querySelector('audio');
            song.currentTime=(song.duration*width)/100;
        });

        //setting the volume functionality
        var values = document.querySelector('#vol-control');
        var song = document.querySelector('audio');
        values.addEventListener('change',setVolume)//watching the change
        $('.responsive-pane i').on('click',function(){
                $('.responsive-pane i').removeClass('fa-volume-up').addClass('fa-volume-off');
                $('.responsive-pane i').removeClass('fa-volume-down').addClass('fa-volume-off');
                $('.responsive-pane span').text('Muted');
                song.volume=0;
            console.log(song.volume);
        })
        function setVolume(){
            song.volume = this.value / 100;//converts to values in btw 0 n 1
            if(this.value < 50){
                $('.responsive-pane i').removeClass('fa-volume-up').addClass('fa-volume-down');
                $('.responsive-pane span').text(' ');
                values=this.value;
            }
            else if(this.value > 50){
                $('.responsive-pane i').removeClass('fa-volume-down').addClass('fa-volume-up');
                $('.responsive-pane span').text(' ');
                values=this.value;
            }//changing the fa icon
        };

        function changeCurrentSongDetails(songObj) {
            $('.current-song-image').attr('src','Img/' + songObj.image)
            $('.current-song-name').text(songObj.name)
            $('.current-song-album').text(songObj.album)
        }


        var songNumber = 1;

        function addSongNameClickEvent(songObj,position) {//passing object instead of just some specified value
            var id = '#song' + position;
            var songName = songObj.fileName;
            $(id).click(function() {
                var audio = document.querySelector('audio');
                var currentSong = audio.src;
                if(songNumber !== position)//if the requested song and the running song r not same
                {
                    audio.src = songName;
                    songNumber = position;
                    changeCurrentSongDetails(songObj);
                }
                toggleSong();
            });
        }

        
        //does the stipulated functions after the window is loaded
        window.onload = function() {
            changeCurrentSongDetails(songs[0]);
            for(var i =0; i < songs.length;i++) {
                    //using the songs object to fill in all the details
                var obj = songs[i];
                var name = '#song' + (i+1);
                var song = $(name);
                song.find('.song-name').text(obj.name);
                song.find('.song-artist').text(obj.artist);
                song.find('.song-album').text(obj.album);
                song.find('.song-length').text(obj.duration);
                addSongNameClickEvent(obj,i+1)
            }
            $('#songs').DataTable({
                paging : false//removed unnecessary pagination
            });

            //checks and changes the time for every 1 second
            updateCurrentTime();
            setInterval(function() {
            updateCurrentTime();
            },1000); //1000 represents time in milliseconds
        }

$('.fa-repeat').on('click',function(){
    $('.fa-repeat').toggleClass('inactive');
    willLoop = 1- willLoop; //for repeat
});

$('.fa-random').on('click',function(){
    $('.fa-random').toggleClass('inactive');
    willShuffle = 1- willShuffle; //for shuffle
});

//to keep songs continuing and checking if or not repeat is requested
$('audio').on('ended',function(){
    var audio = document.querySelector('audio');
    if(willLoop==0){
        if(currentSongNumber < songs.length)
        {
            var nextSongObj = songs[currentSongNumber];
            audio.src = nextSongObj.fileName;
            toggleSong();
            changeCurrentSongDetails(nextSongObj);
            currentSongNumber = currentSongNumber + 1;
        }
        else{
            $('.play-icon').removeClass('fa-pause').addClass('fa-play');
            audio.currentTime = 0;
        }
    }
    else if(willLoop==1){
        if(currentSongNumber < songs.length)
        {
            var nextSongObj = songs[currentSongNumber];
            audio.src = nextSongObj.fileName;
            toggleSong();
            changeCurrentSongDetails(nextSongObj);
            currentSongNumber = currentSongNumber + 1;
        }
        else if(currentSongNumber = songs.length){
            var nextSongObj = songs[0];
            audio.src = nextSongObj.fileName;
            toggleSong();
            changeCurrentSongDetails(nextSongObj);
            currentSongNumber = 1;
        }
    }
    else if(willShuffle==1){
       
    }
});

var next = document.querySelector('.fa-step-forward')
next.addEventListener('click',function(){
    var audio=document.querySelector('audio');
    if(songNumber<songs.length){
        var nextSong = songs[songNumber];
        audio.src=nextSong.fileName;
        changeCurrentSongDetails(nextSong)
        songNumber++;
        toggleSong();
    }
   else if(songNumber=songs.length){
       changeCurrentSongDetails(songs[0])
       toggleSong();
        songNumber=1;
    }
});

var previos = document.querySelector('.fa-step-backward')
previos.addEventListener('click',function(){
    var audio=document.querySelector('audio');
    if(songNumber>1){
            var prevSong=songs[songNumber-2];
            audio.src=prevSong.fileName;
            changeCurrentSongDetails(prevSong);
            toggleSong();
            songNumber--;
        }
   else{
            var prevSong=songs[songs.length-1];
            audio.src=prevSong.fileName;
            changeCurrentSongDetails(prevSong);
            toggleSong();
            songNumber=songs.length;
    }
})

function timeJump(){var song = document.querySelector('audio');song.currentTime=song.duration-5;}

$('#see-playlist').on('click',function(){
    $('#mood-list').addClass('hidden')
     $('#songs_wrapper').removeClass('hidden');
})
$('#see-moodlist').on('click',function(){
    $('#songs_wrapper').addClass('hidden');
    $('#mood-list').removeClass('hidden');

})

// $('.mood').on('click',function(){
//             $('#mood-list').addClass('hidden')
//        });