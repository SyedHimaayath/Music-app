        $('.cover button').on('click', function() {
            var name = $('#name-input').val();
            if(name.length >= 2)//user gets access only if username input value is greater than or equal to 2 
            {
                var message = "Welcome, " + name;
                $('.main .user-name').text(message);
                $('.cover').addClass('hidden');
                $('.main').removeClass('hidden');
            }
            else
            {
                $('#name-input').addClass('error');
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
        
        var songs = [{
                'name': 'Why not me',
                'artist': 'Enrique',
                'album': 'Enrique',
                'duration': '2:56',
               'fileName': 'song1.mp3',
               'image' : 'song1.jpg'
            },
            {
                'name': 'Jaaniya',
                'artist': 'singer 2',
                'album': 'Haunted',
                'duration': '3:15',
                'fileName': 'song2.mp3',
                'image' : 'song2.jpg'
            },
            {
                'name': 'Aye Dil Bata',
                'artist': 'singer 3',
                'album': 'Aye Dil Bata',
                'duration': '2:34',
                'fileName': 'song3.mp3',
                'image' : 'song3.jpg'
            },
            {
                'name': 'Safarnama',
                'artist': 'singer 4',
                'album': 'Tamasha',
                'duration': '2:29',
                'fileName': 'song4.mp3',
                'image' : 'song4.jpg'
            }]

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
            var currentTime = Math.floor(song.currentTime);
            // uses the function fancyTimeFormat to convert the current time seconds to minutes
            currentTime = fancyTimeFormat(currentTime);
            var duration = Math.floor(song.duration);
            // uses the function fancyTimeFormat to convert the duration seconds to minutes
            duration = fancyTimeFormat(duration)
            $('.time-elapsed').text(currentTime);
            $('.song-duration').text(duration);
        }

        function changeCurrentSongDetails(songObj) {
            $('.current-song-image').attr('src','Img/' + songObj.image)
            $('.current-song-name').text(songObj.name)
            $('.current-song-album').text(songObj.album)
        }


        var songNumber = 1;

        function addSongNameClickEvent(songObj,position) {
            var id = '#song' + position;
            var songName = songObj.fileName;
            $(id).click(function() {
                var audio = document.querySelector('audio');
                var currentSong = audio.src;
                if(songNumber !== position)
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
                paging : false
            });

            //checks and changes the time for every 1 second
            updateCurrentTime();
            setInterval(function() {
            updateCurrentTime();
            },1000); //1000 represents time in milliseconds
        }

$('.fa-repeat').on('click',function(){
    $('.fa-repeat').toggleClass('inactive');
    willLoop = 1- willLoop;
});

$('.fa-random').on('click',function(){
    $('.fa-random').toggleClass('inactive');
    willShuffle = 1- willShuffle;
});

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


function timeJump(){var song = document.querySelector('audio');song.currentTime=song.duration-5;}
