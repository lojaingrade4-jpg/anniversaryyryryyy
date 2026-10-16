const loveExeSupabase = window.supabase.createClient(
    "https://zqsdejzkyajakilvmrxr.supabase.co",
    "sb_publishable_mnhMNS9z4Wzpt4vOQuOlVA_F1C2kw0a"
);
document.addEventListener("DOMContentLoaded", () => {

    const computerScreen = document.querySelector(".computer-screen");

    if (!computerScreen) {
        console.error("LOVE.EXE: .computer-screen was not found.");
        return;
    }

    let frontingName = "Maverick";
    let isUnlocked = false;
    let clockInterval = null;
    let mapInstance = null;

    // ============================================================
    // LOVE LETTERS
    // ============================================================

    const loveLetters = {

        anniversary: {
            title: "HAPPY ANNIVERSARY ♡",
            subtitle: "15 / 06 / 26",
            text: `
 happy 2 months, [name] ❤️ i genuinely cant believe its alr been two months with you!! iit may not seem like a long time, but youve already become such a special and important part of my life, and im soo grateful for every moment weve shared together<33 you make me so happy in ways i cant even properly explain, and i love all the little things about you. i hope we have so many more months and memories together because i really don’t want this to be the end of our story. thank you for being there, for making me smile, and for making these past two months so special. i love you so much, and happy two months to us!! 💗  

            `
        },

        firstMet: {
            title: "SPLITTING (BPD)",
            subtitle: "i hope ur okay",
            text: `

hii, [name] ! <33 please pick one of the options below ^^ 

1. if your splitting on me

hello [name] , if youre reading this right now, im guessing everything feels really overwhelming for you :( maybe you feel angry, hurt, distant, scared, or like you suddenly dont want anything to do with me,  whatever youre feeling right now, youre allowed to feel it ! you dont have to feel guilty for having  emotions that are difficult to control, and you dont have to figure everything out right this second,, please remember that im not going anywhere just because youre having a hard moment,, you are not toomuch for me, and you are not a burden if your mind is telling you that i hate you, that im going to leave, or that everything between us is ruined, please remember that those thoughts are not at all the truth. take a little time, breathe, drink some water, listen to something calming, and let yourself calm down !, you dont have to push me away to protect yourself, and you dont have to be perfect for me to love you. i love you on the easy days and the difficult ones, and when youre ready, ill still be here!! ^^

2. if your splitting bc of someone else

haii [name],  if someone has hurt you or made you feel overwhelmed and youre splitting because of them, please remember that you dont have to deal with all of those feelings alonee, i know whatever happened might feel really hard right now, and im so sorry that youre hurting<3 youre allowed to be angry, upset, disappointed, or confused you dont have to pretend that what happened did not affect you, give yourself tthe time you need to calm down,breathe, take some space from the situation, and drink some water, come and text me and talk about what happenned too if you wanna! ^^
            `
        },

        firstDate: {
            title: "SPLITTING (DID)",
            subtitle: "remember this?",
            text: `
heyy mll, if youre reading this right now, please take a breath and remind yourself that you dont have to figure everything out all at once!! i know things might feel confusing, overwhelming, or completely different from what you were feeling before, and thats okay. you dont have to force yourself to act a certain way or pretend that everything is fine ! take your time and give yourself the space you need. if things feel confusing or you feel disconnected, please remember that youre safe in this moment and that you dont have to handle everything by yourself<33 you are still cared for, you are still important, and nothing about a difficult moment changes how much i care about you. if you need space, ill give you space, and if you need reassurance, ill be here to remind you that you are loved. you dont have to be scared of being too much for me, and you dont have to apologize for something that you are struggling with. just take things one moment at a time, be gentle with yourself, and remember that im here when youre ready!!! i love u sooo much
            `
        },

        sad: {
            title: "OPEN WHEN YOU'RE SAD ♡",
            subtitle: "a little reminder from me",
            text: `
hii [name], if youre reading this right now, im guessing youre having a bad dayy :(. i wish i could be there beside you right now and give you the biggest hug until you feel a little better. itd be lovely if you went and told me what happened in dms thatd be awesome, but you dont have to!!!! dont feel pressured or anything<3 take a deep breath, get somewhere comfortable, drink some water, and give yourself some time ! you dont have to fix everything right now and please remember that one bad day does not mean everything is bad. whatever is making you sad right now will not last forever, even if it feels like it will. youre still the same amazing person i love so much, even when youre crying, overwhelmed, or having a difficult day. you are never a burden to me, and you never have to feel like you have to deal with everything alone. if you need someone to listen, im here. if you need reassurance, im here. if you need some space, ill still be here when youre ready. i love you more than you probably realize, and i hope you remember that whenever your mind makes you forget. please be gentle with yourself today, okay? you deserve kindness too!
            `
        },

        missMe: {
            title: "OPEN WHEN YOU MISS ME ♡",
            subtitle: "for the moments when we're apart",
            text: `
haii [name] if youre reading this, then im guessing youre missing me right now. i wish i could magically appear beside you and give you the BIGGEST hug ever because i probably miss you just as much. i know sometimes the distance between us can feel reallyyyyy lonely, but plss remember that just because im not beside you doesnt mean im not thinking about you. youre always somewhere in my mind, whether im doing something important, laughing at something, or just lying in bed!!i hope you know how much i treasure every moment we get together, even the little ones that might not seem important at the time. go ahead and text me! spam me or do anything i dont mind <33  if im sleeping i promiseee to get back to you when im awake! i dont mind ifya blow up my messages xDD i love you sosoooso muchnever forget that !
            `
        },

        angry: {
            title: "OPEN WHEN YOU'RE MAD ♡",
            subtitle: "please read this!! i want to help you feel better",
            text: `
hellololoo [name] if youre reading this right now, im guessing youre really angry about something. whatever happened, i hope ur okay:((( go try maybe screaming into a pillow, throwing things around, or whatever helps you get your feelings out? give yourself time to understand what youre feeling and what you actually want to say. if youre mad at me,  you can tell me!!  you dont have to keep it inside or be scared that im going to leave just because youre upset with me. id rather know what hurt you so we can talk about it together when youre ready. being angry doesnt make you a bad person, and having a bad moment doesnt erase all the good in you. i love you even when youre frustrated, annoyed, or angry, and im still here.take your time, calm down, and when youre ready, we can figure things out together. <33 whatever or whoever made you angry, i hope it all gets resolved soon ! if you like you can text me and rant to me about what happened? i promise i wont mindd<3 
            `
        },

        lonely: {
            title: "OPEN WHENR LONELY ♡",
            subtitle: "you are never actually alone",
            text: `
hii, [name] !! if youre reading this right now, im guessing youre feeling really lonely :(( i wish i could be there with you right now!!! even if it feels like nobody understands you right now, youre loved, cared for, and important to me. you never have to earn my love or prove that you deserve to have someone there for you. try doing something small that makes you feel a little more comfortable! put on your favorite song, watch something you love, cuddle up somewhere cozy, or even just close your eyes and take a few slow breaths ^^ if you need me, please reach out!!!! you never have to feel embarrassed for wanting company or reassurance. i would always rather know that youre having a hard time than have you sit there thinking you have to deal with everything alone :(, andddd if i could be there right now, id give you the longest hug EVERR!!!  so until i can actually do that, you can use ur imagination to picture me doing that!!!! youre loved, youre important, and youre never as alone as your mind might make you feel. nd if im not answering right away, dont think im ignoring you or dont wanna talk!! i might just be busy or asleep, but ill get back to you when i can <33 i love you so much, [name]!!
            `
        },

        sleep: {
            title: "OPEN WHEN YOU CAN'T SLEEP ♡",
            subtitle: "goodnight, silly",
            text: `
hii [name] , if youre reading this right now, its probably way too late and youre STILL awake for some reason 😭??  what are you doinggg!!go to SLEEP!! i wish i could be there beside you right now, telling you to close your eyes and get some rest! buttt since i cant, let this letter keep you company for a little while <33 you dont have to think about everything thats happened today, tomorrow, or anything thats stressing you out right now. whatever is on your mind can wait until morning!! you do NOT need to solve everything at nightok?? go get comfortable! put your phone down for a little bit, get some water if you need it, get under your blankets, take some slow breaths, and just relax. unclench your jaw, drop your shoulders, close your eyes, and STOP THINKING SO MUCHHH >:( if your thoughts start getting loud again, just remind yourself that youre allowed to rest. you dont have to be productive right now, you dont have to figure anything out, and you dont have to do anything except exist and hopefully fall asleep xDD you dont have to reply to this or do anything!! just rest, okay?? tomorrow is another day and whatever youre worrying about can be dealt with when youre awake. for now, SLEEP 😭 goodnight my love, sweet dreams, and remember that i love you so so muchhhh
            `
        },

        happy: {
            title: "OPEN WHEN YOU'RE HAPPY ♡",
            subtitle: "I want to know about it",
            text: `
hii !! if youre reading this while youre happy, then YAYYYY :DDD i hope whatever happened has put the biggest smile on your face because you deserve every bit of happiness you get <33 i  hope youre laughing, smiling, feeling excited, or just having one of those moments where everything feels good!!please enjoy it as much as you can and dont start worrying about when its gonna end. youre allowed to just be happy!! you dont have to feel guilty for enjoying yourself or think that something bad has to happen just because youre having a good day. and pls know that knowing youre happy makes  ME happy too 😭 even if im not there to see your face right now, just imagining you being genuinely happy makes me smile. i love seeing you get excited about things, hearing you talk about stuff you love, and everything ab uuuu!!!!!!!1 iqf something happened that made you happy, TELL ME ABOUT IT LATER!! i wanna hear alllll about it. even if its you think its something completely stupid or random so please go enjoy yourself!! laugh as much as you want, be silly, be excited, listen to your favorite music, talk to me me, do whatever makes you happy!! and if youre happy because of something i did, then come tell me so i can be happy about making you happy >:)) keep smiling, my love. i love you sooo much, [name], and i hope you have a million more  moments like this <33 ♡
            `
        },

        stressed: {
            title: "OPEN WHEN YOU'RE STRESSED ♡",
            subtitle: "breathe for me",
            text: `
hii [name] my love, if youre reading this right now, im guessing your really stressed :(( m whatever is stressing you out, please remember that you dont have to figure everything out all at once!! first things first, breathe take a deep breath and give yourself a second to jcalm down without thinking about everything you need to do. unclench your jaw, relax your shoulders, drink some water, and sit somewhere comfy for a bit. you dont have to be productive every second of the day either!! if you need a break, TAKE ONE. eat something if you havent, listen to music, watch something, lie down, go outside for a little bit, literally whatever helps you feel a little better. you can deal with things one at a time instead of trying to carry EVERYTHING at once <33 and if youre stressing about something that feels impossible right now, please remember that you dont have to solve it all immediately. take it step by step!! you are capable of getting through it, even if your brain is screaming at you that you cant. ANDDDD if you need someone to talk to, complain to, cry to, or just spam with a bunchamessages, TEXT ME!! you never have to apologize for needing reassurance or support. i would much rather you come talk tome than sit there stressing all by yourself :( so breathe, my love. take a little break. youre doing your best and thats enough!! im proud of you for getting through everything youve already had to deal with, and i know you can get through this too <33 i love you so much, [name]. please be gentle with yourself, okay? ♡
            `
        },

        sick: {
            title: "OPEN WHEN YOU'RE NOT FEELING WELL ♡",
            subtitle: "take care of yourself",
            text: `
hii my loveee, if youre reading this right now, you probably feel really crappy :(( i wish more than anything that i could be there to take care of you right now. id get you water, bring you food, get you blankets, make sure youre comfy, and probably annoy you by checking on you every five minutes 😭since i cant be there right now, you HAVE to promise me youre gonna take care of yourself!! get plenty of rest, drink some water, eat something if you can, take whatever you normally need to take, and let yourself sleep as much as you need. dont try to push yourself too hard just because you feel like you should be doing something!! you dont need to worry about being productive or getting everything done right now. youre sick!! your only job is to rest and let yourself feel better <33 if youre feeling absolutely miserable, just remember that you wont feel like this forever, even if it feels like it right now. and pls tell me how youre feeling!! you dont have to pretend youre okay just because you dont wanna worry me. i WANT to know if youre feeling shitty so i can bother you and make sure youre okay 😭 you can text me whenever you want, even if all you say is "i feel awful" and then disappear again xDD imagine me giving you the biggest warmest hug ever and tucking you into bed >:( now go get comfortable, drink some water, get cozy, and RESTTTT !!!!! i love you sooo much, [name], and i hope you feel better very very soon <33 ♡
            `
        },

        insecure: {
            title: "OPEN WHEN YOU FEEL INSECURE ♡",
            subtitle: "you need to hear this",
            text: `
hii baby, if youre reading this right now, youre probably  being really mean to yourself again :(( maybe youre looking in the mirror and picking apart everything you dont like, comparing yourself to someone else, or wondering if youre good enough. whatever it is, STOPPP for a second and breathe, i know your brain can be really mean to you sometimes, but you dont have to believe every horrible thing it tells you. i really really wish you could see yourself the way i see you. i wish you could see all the little things about you that make you so special to me, including the things you might not even like about yourself. you dont have to look a certain way, act a certain way, or be perfect for me to love you!! youre you, and thats exactly who i want <33 please dont let one insecure thought convince you that youre suddenly less beautiful, less lovable, or less worthy. youre not!! one bad picture doesnt change how you look. one bad day doesnt change who you are. comparing yourself to someone else doesnt suddenly make you less amazing. and your flaws dont make you any less deserving of love. i love your personality, your little habits, the way you talk, the way you get excited about things, the random things you say, and all the tiny pieces of you that make you YOU. i dont love some perfect imaginary version of you. i love YOUUU <33 so please be gentle with yourself today!! if the mirror is making you feel worse, step away from it. stop scrolling if youre comparing yourself to people online. go do something that makes you feel comfortable and happy instead!! and if you forget how loved you are, COME BACK AND READ THIS AGAIN!! or better yet, text me and let me remind you myself >:)) you are enough. you have always been enough. and to me, youre more than enough. i love you so much, [name] ♡
            `
        },

        bored: {
            title: "OPEN WHEN YOU'RE BORED ♡",
            subtitle: "go do something silly",
            text: `
hii [name] , if youre reading this right now, im guessing youre bored out of your MIND and have absolutely nothing to do 😭 well congratulations, you have officially opened a letter from me, so now you have something to do!! youre welcome xDD first of all,  GO DO SOMETHING 😭 go listen to your favorite song, watch something you love, play a game, draw something, go outside, make food, reorganize your room orr do arts and crafts!  ORRR you could spend this time thinking about me because obviously thats the best option 🙄 LMAOAOO  if youre STILL bored after all that, then make your own entertainment!! make a playlist, take pictures, write something, learn something random, play a game, actually wait, TEXT ME!! spam me with random shit!! send me pictures of what youre doing, tell me some thought you just had, send me a meme, or just say "im bored" and make it MY problem now >:)) now go do something fun, loser/lh 😭 i love youuu ♡
            `
        },

        thankYou: {
            title: "THANK YOU ♡",
            subtitle: "for everything",
            text: `
THANK YOU FOR EVERYTHING!!!!!!!!!!!!!!!!!!!1111 i love u so much, [name] and i hope you know how much you mean to me <33 you make me so happy and i love every little thing about you. thank you for being there for me, for making me smile, for making these past two months so special, and for being the most amazing person i could ever ask for. i love you more than words can express, and i cant wait to make even more memories with you in the future!! ♡
            `
        }

    };

// ============================================================
// MUSIC
// ============================================================

const music = [

    {
        title: "Legendary Lovers",
        artist: "Katy Perry",
        rotation: "-7deg",
        top: "10%",
        left: "8%",
        embed: "https://open.spotify.com/embed/track/5M3xGtOBB6igMcBPE5mZ10"
    },

    {
        title: "feelz",
        artist: "lil peep",
        rotation: "6deg",
        top: "15%",
        right: "7%",
        embed: "https://open.spotify.com/embed/track/3kofbhXJJrHrcBaTstmNvh"
    },

    {
        title: "Risk it all",
        artist: "Bruno Mars",
        rotation: "-4deg",
        bottom: "12%",
        left: "12%",
        embed: "https://open.spotify.com/embed/track/5q28XAIqiVLzZVsHvnUJ7K"
    },

    {
        title: "u + me = <3",
        artist: "Olivia Rodrigo",
        rotation: "8deg",
        bottom: "9%",
        right: "12%",
        embed: "https://open.spotify.com/embed/track/6Hdc3IQeyCxG5d14uAcwQW"
    }

];


    // ============================================================
    // HOME
    // ============================================================

    function switchFront() {
        document.body.classList.remove("password-mode");
        showHome();
    }


    function showHome() {

        document.body.classList.remove("password-mode");
        document.body.classList.remove("desktop-mode");

        computerScreen.innerHTML = `
            <h1>♡ HELLO MY LOVE ♡</h1>
            <p>who's here right now?</p>

            <button id="one-person">ONE PERSON</button>
            <button id="co-front">CO-FRONT</button>
            <button id="blurry">I'M BLURRY</button>
        `;

        document.getElementById("one-person")
            .addEventListener("click", showOnePerson);

        document.getElementById("co-front")
            .addEventListener("click", showCoFront);

        document.getElementById("blurry")
            .addEventListener("click", showBlurry);
    }


    // ============================================================
    // ONE PERSON
    // ============================================================

    function showOnePerson() {

        computerScreen.innerHTML = `
            <h1>♡ WHOS FRONTING? ♡</h1>

            <p>enter your name</p>

            <input
                type="text"
                id="name-input"
                placeholder="type here..."
                autocomplete="off"
            >

            <br><br>

            <button id="continue-button">
                CONTINUE ♡
            </button>

            <br><br>

            <button id="back-button">
                ← BACK
            </button>
        `;

        const input = document.getElementById("name-input");

        document.getElementById("continue-button")
            .addEventListener("click", saveName);

        document.getElementById("back-button")
            .addEventListener("click", showHome);

        input.focus();

        input.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                saveName();
            }
        });
    }


    function saveName() {

        const input = document.getElementById("name-input");

        if (!input) return;

        const typedName = input.value.trim();

        if (typedName !== "") {
            frontingName = typedName;
        }

        if (isUnlocked) {
            renderDesktop();
        } else {
            showPassword();
        }
    }


    // ============================================================
    // BLURRY
    // ============================================================

    function showBlurry() {

        frontingName = "Maverick";

        if (isUnlocked) {
            renderDesktop();
        } else {
            showPassword();
        }
    }


    // ============================================================
    // CO-FRONT
    // ============================================================

    function showCoFront() {

        computerScreen.innerHTML = `
            <h1>♡ CO-FRONTING ♡</h1>

            <p>enter who's here</p>

            <input
                type="text"
                id="cofront-input"
                placeholder="name + name..."
                autocomplete="off"
            >

            <br><br>

            <button id="cofront-continue">
                CONTINUE ♡
            </button>

            <br><br>

            <button id="back-button">
                ← BACK
            </button>
        `;

        const input = document.getElementById("cofront-input");

        function continueCofront() {

            const names = input.value.trim();

            if (names !== "") {
                frontingName = names;
            }

            if (isUnlocked) {
                renderDesktop();
            } else {
                showPassword();
            }
        }

        document.getElementById("cofront-continue")
            .addEventListener("click", continueCofront);

        document.getElementById("back-button")
            .addEventListener("click", showHome);

        input.focus();

        input.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                continueCofront();
            }
        });
    }


    // ============================================================
    // PASSWORD
    // ============================================================

    function showPassword() {

        document.body.classList.add("password-mode");

        computerScreen.innerHTML = `
            <div class="password-screen">

                <div class="password-box">

                    <div class="password-icon">♡</div>

                    <h1>LOVE.EXE</h1>

                    <p>
                        Welcome, ${escapeHTML(frontingName)}
                    </p>

                    <input
                        type="password"
                        id="password-input"
                        placeholder="Password"
                        autocomplete="off"
                    >

                    <p class="password-hint">
                        enter the date we started dating!<br>
                    </p>

                    <button id="password-button">
                        →
                    </button>

                    <p id="password-error"></p>

                </div>

            </div>
        `;

        const input = document.getElementById("password-input");

        document.getElementById("password-button")
            .addEventListener("click", checkPassword);

        input.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                checkPassword();
            }
        });

        input.focus();
    }


    function checkPassword() {

        const input = document.getElementById("password-input");
        const error = document.getElementById("password-error");

        if (!input || !error) return;

        const password = input.value
            .trim()
            .replace(/-/g, "/");

        if (password === "15/6/26") {

            isUnlocked = true;
            showDesktop();

        } else {

            error.textContent = "incorrect password ♡";

            input.classList.remove("shake");

            void input.offsetWidth;

            input.classList.add("shake");
        }
    }


    // ============================================================
    // DESKTOP LOADING
    // ============================================================

    function showDesktop() {

        document.body.classList.add("desktop-mode");

        computerScreen.innerHTML = `
            <div class="loading-screen">

                <div class="loading-heart">
                    ♡
                </div>

                <p>
                    desktop loading<span class="dots">...</span>
                </p>

            </div>
        `;

        setTimeout(() => {

            if (!document.querySelector(".loading-screen")) {
                return;
            }

            computerScreen.innerHTML = `
                <div class="welcome-screen">

                    <div class="welcome-text">
                        WELCOME, ${escapeHTML(frontingName).toUpperCase()}
                    </div>

                </div>
            `;

            setTimeout(() => {

                if (document.querySelector(".welcome-screen")) {
                    renderDesktop();
                }

            }, 1800);

        }, 2500);
    }


    // ============================================================
    // DESKTOP
    // ============================================================

    function renderDesktop() {

        document.body.classList.add("desktop-mode");
        document.body.classList.remove("password-mode");

        if (clockInterval) {
            clearInterval(clockInterval);
            clockInterval = null;
        }

        if (mapInstance) {
            try {
                mapInstance.remove();
            } catch (error) {}

            mapInstance = null;
        }

        /*
            The icons are deliberately scattered.

            LEFT:
            4 icons near the upper/middle-left

            RIGHT:
            4 icons near the upper/middle-right

            BOTTOM:
            a few extras
        */

        const icons = [

            {
                id: "love-letter-app",
                icon: "💌",
                label: "LETTERS",
                top: "7%",
                left: "7%"
            },

            {
                id: "distance-app",
                icon: "🌎",
                label: "DISTANCE",
                top: "27%",
                left: "8%"
            },

            {
                id: "music-app",
                icon: "🎵",
                label: "MUSIC",
                top: "48%",
                left: "6%"
            },

            {
                id: "favorites-app",
                icon: "🎀",
                label: "FAVSS",
                top: "69%",
                left: "9%"
            },

            {
                id: "our-files-app",
                icon: "📁",
                label: "FILESS",
                top: "10%",
                right: "7%"
            },


            {
                id: "gallery-app",
                icon: "🖼️",
                label: "GALLERY",
                top: "51%",
                right: "7%"
            },

            {
                id: "notes-app",
                icon: "💬",
                label: "NOTES",
                top: "72%",
                right: "10%"
            },

            {
                id: "games-app",
                icon: "🎮",
                label: "GAMES",
                top: "79%",
                left: "28%"
            },

            {
                id: "special-app",
                icon: "⭐",
                label: "SPECIAL",
                top: "77%",
                right: "28%"
            },

            {
                id: "trash-app",
                icon: "🗑️",
                label: "TRASH",
                top: "4%",
                left: "46%"
            },
            {
                id: "alters-app",
                icon: "🧩",
                label: "ALTERS.EXE",
                top: "38%",
                right: "10%"
            }
        ];

        computerScreen.innerHTML = `
            <div class="desktop">

                <div
                    class="desktop-icons"
                    id="desktop-icons"
                    style="
                        position: absolute;
                        inset: 0 0 30px 0;
                        display: block;
                    "
                >

                    ${icons.map(item => `
                        <div
                            class="desktop-icon love-desktop-icon"
                            id="${item.id}"
                            style="
                                position:absolute;
                                top:${item.top};
                                ${item.left ? `left:${item.left};` : ""}
                                ${item.right ? `right:${item.right};` : ""}
                                width:100px;
                                min-height:105px;
                                display:flex;
                                flex-direction:column;
                                align-items:center;
                                justify-content:flex-start;
                                text-align:center;
                                cursor:pointer;
                                z-index:10;
                            "
                        >

                            <div
                                class="icon"
                                style="
                                    font-size:52px;
                                    line-height:58px;
                                    width:70px;
                                    height:65px;
                                    display:flex;
                                    align-items:center;
                                    justify-content:center;
                                "
                            >
                                ${item.icon}
                            </div>

                            <span
                                style="
                                    font-size:12px;
                                    font-weight:bold;
                                    margin-top:4px;
                                    max-width:100px;
                                    text-shadow:
                                        1px 1px #000,
                                        -1px -1px #000,
                                        1px -1px #000,
                                        -1px 1px #000;
                                "
                            >
                                ${item.label}
                            </span>

                        </div>
                    `).join("")}

                </div>

                <div class="desktop-taskbar">

                    <span>♡ LOVE.EXE</span>

                    <button id="switch-front">
                        SWITCH FRONT
                    </button>

                    <span id="desktop-time"></span>

                </div>

            </div>
        `;

        updateClock();

        clockInterval = setInterval(updateClock, 1000);

        document.getElementById("switch-front")
            .addEventListener("click", switchFront);

        document.getElementById("distance-app")
            .addEventListener("click", showDistance);

        document.getElementById("games-app")
            .addEventListener("click", showGames);

        document.getElementById("love-letter-app")
            .addEventListener("click", () => {
                showLoveLetter("anniversary");
            });

        document.getElementById("music-app")
            .addEventListener("click", showMusic);

        document.getElementById("favorites-app")
            .addEventListener("click", showFavorites);

        document.getElementById("special-app")
            .addEventListener("click", showSpecial);

        document.getElementById("our-files-app")
            .addEventListener("click", showOurFiles);

        document.getElementById("gallery-app")
            .addEventListener("click", showGallery);

        document.getElementById("notes-app")
            .addEventListener("click", showNotes);
        document.getElementById("alters-app")
            .addEventListener("click", showAlters);

        document.getElementById("desktop-icons")
            .addEventListener("click", function(event) {

        const trash = event.target.closest("#trash-app");

        if (trash) {

            document.body.classList.add("corrupted");

            const warning = document.createElement("div");

            warning.className = "corruption-warning";

            warning.innerHTML = `
                <div class="corruption-box">

                    <div class="corruption-title">
                        ⚠ WARNING ⚠
                    </div>

                    <div class="corruption-text">
                        RECYCLE BIN CORRUPTED
                    </div>

                    <div class="corruption-subtext">
                        SYSTEM ERROR 0x0000007B
                    </div>

                    <button id="closeCorruption">
                        OK
                    </button>

                </div>
            `;

            document.body.appendChild(warning);

            document.getElementById("closeCorruption")
                .addEventListener("click", function () {

                    warning.remove();
                    document.body.classList.remove("corrupted");

                    startTrashGame();

                });

        }

    });

}

/* ============================================================
   TRASH POPUP MINIGAME
   ============================================================ */

function startTrashGame() {

    const existing = document.getElementById("trash-game");

    if (existing) {
        existing.remove();
    }

    const game = document.createElement("div");

    game.id = "trash-game";

    game.innerHTML = `
        <div class="trash-game-top">

            <div>
                ⚠ SYSTEM CORRUPTION
            </div>

            <div>
                TIME:
                <span id="trash-timer">15</span>
            </div>

        </div>

        <div class="trash-game-info">

            <strong>RECYCLE BIN ERROR</strong>

            <p>
                CLOSE THE POPUPS BEFORE THE SYSTEM FAILS.
            </p>

            <p>
                SOME POPUPS MAY CONTAIN HIDDEN MESSAGES.
            </p>

            <div>
                POPUPS CLOSED:
                <span id="trash-score">0</span>
                /
                <span id="trash-total">20</span>
            </div>

        </div>

        <div id="trash-popup-area"></div>

        <div
            id="trash-result"
            class="trash-result"
            style="display:none;"
        ></div>
    `;

    document.body.appendChild(game);

    const popupArea =
        document.getElementById("trash-popup-area");

    const scoreElement =
        document.getElementById("trash-score");

    const timerElement =
        document.getElementById("trash-timer");

    const result =
        document.getElementById("trash-result");

    const totalPopups = 20;

    let closed = 0;
    let timeLeft = 15;
    let gameOver = false;

    const hiddenMessages = [
        "you found me ♡",
        "i love you so much",
        "youre stuck with me >:3",
        "SURPRISE MESSAGE ♡",
        "youre my favorite person",
        "hehe you actually found this",
        "dont give up!!",
        "one more popup...",
        "i hope this made you smile ♡",
        "I LOVE YOUUUU"
    ];


    function endGame(success) {

        if (gameOver) return;

        gameOver = true;

        clearInterval(timer);

        popupArea.innerHTML = "";

        result.style.display = "block";

        if (success) {

            result.innerHTML = `
                <div class="trash-success">

                    <div class="trash-result-icon">
                        ♡
                    </div>

                    <h1>
                        SYSTEM RESTORED
                    </h1>

                    <p>
                        YOU SAVED THE RECYCLE BIN!!
                    </p>

                    <p>
                        you found all the hidden messages ♡
                    </p>

                    <button id="trash-finish">
                        RETURN TO DESKTOP
                    </button>

                </div>
            `;

        } else {

            result.innerHTML = `
                <div class="trash-failure">

                    <div class="trash-result-icon">
                        💀
                    </div>

                    <h1>
                        SYSTEM FAILURE
                    </h1>

                    <p>
                        TOO SLOW...
                    </p>

                    <p>
                        the recycle bin has completely corrupted.
                    </p>

                    <button id="trash-finish">
                        TRY AGAIN
                    </button>

                </div>
            `;
        }


        document.getElementById("trash-finish")
            .addEventListener("click", function () {

                game.remove();

                if (success) {
                    renderDesktop();
                } else {
                    startTrashGame();
                }

            });
    }


    function createPopup(index) {

        if (gameOver) return;

        const popup =
            document.createElement("div");

        popup.className = "trash-popup";

        const width =
            230 + Math.floor(Math.random() * 100);

        const left =
            3 + Math.random() * 75;

        const top =
            18 + Math.random() * 68;

        popup.style.width = width + "px";
        popup.style.left = left + "%";
        popup.style.top = top + "%";

        const isHiddenMessage =
            index % 4 === 0;

        const message =
            hiddenMessages[
                index % hiddenMessages.length
            ];

        popup.innerHTML = `

            <div class="trash-popup-title">

                <span>
                    ⚠ SYSTEM ERROR
                </span>

                <button class="trash-popup-x">
                    ×
                </button>

            </div>

            <div class="trash-popup-content">

                ${
                    isHiddenMessage
                    ? `
                        <div class="hidden-trash-message">
                            ♡ ${message} ♡
                        </div>
                    `
                    : `
                        <strong>
                            WARNING
                        </strong>

                        <p>
                            RECYCLE BIN HAS ENCOUNTERED
                            AN UNEXPECTED ERROR.
                        </p>

                        <small>
                            ERROR CODE:
                            0x${Math.floor(
                                Math.random() * 999999
                            ).toString(16).toUpperCase()}
                        </small>
                    `
                }

                <br>

                <button class="trash-popup-ok">
                    OK
                </button>

            </div>

        `;

        popupArea.appendChild(popup);


        function closePopup() {

            if (gameOver) return;

            popup.remove();

            closed++;

            scoreElement.textContent = closed;


            if (closed >= totalPopups) {

                endGame(true);

                return;
            }


            /*
             * EVERY TIME ONE IS CLOSED,
             * THREE MORE APPEAR
             */

            for (let i = 0; i < 3; i++) {
                createPopup(
                    closed + i + Math.floor(Math.random() * 100)
                );
            }
        }


        popup.querySelector(".trash-popup-x")
            .addEventListener(
                "click",
                closePopup
            );

        popup.querySelector(".trash-popup-ok")
            .addEventListener(
                "click",
                closePopup
            );
    }


    /*
     * START WITH MULTIPLE POPUPS
     */

    for (let i = 0; i < 8; i++) {
        createPopup(i);
    }


    const timer =
        setInterval(() => {

            if (gameOver) {
                clearInterval(timer);
                return;
            }

            timeLeft--;

            timerElement.textContent =
                timeLeft;


            if (timeLeft <= 5) {

                timerElement.classList.add(
                    "trash-timer-danger"
                );

            }


            if (timeLeft <= 0) {

                clearInterval(timer);

                endGame(false);

            }

        }, 1000);
}


    // ============================================================
    // LOVE LETTER APP
    // ============================================================

    function showLoveLetter(active = "anniversary") {

        if (!loveLetters[active]) {
            active = "anniversary";
        }

        const sections = [

            {
                id: "anniversary",
                label: "ANNIVERSARY"
            },

            {
                id: "firstMet",
                label: "SPLITTING (BPD)"
            },

            {
                id: "firstDate",
                label: "SPLITTING (DID)"
            },

            {
                id: "sad",
                label: "SAD"
            },

            {
                id: "missMe",
                label: "MISS ME"
            },

            {
                id: "angry",
                label: "MAD"
            },

            {
                id: "lonely",
                label: "LONELY"
            },

            {
                id: "sleep",
                label: "CAN'T SLEEP"
            },

            {
                id: "happy",
                label: "HAPPY"
            },

            {
                id: "stressed",
                label: "STRESSED"
            },

            {
                id: "sick",
                label: "SICK"
            },

            {
                id: "insecure",
                label: "INSECURE"
            },

            {
                id: "bored",
                label: "BORED"
            },

            {
                id: "thankYou",
                label: "THANK YOU"
            }

        ];

        const letter = loveLetters[active];

        computerScreen.innerHTML = `
            <div class="letter-app">

                <div class="letter-top">

                    <span>
                        💌 LOVE.EXE / LOVE LETTER
                    </span>

                    <button id="letter-back">
                        ← DESKTOP
                    </button>

                </div>

                <div class="letter-tabs">

                    ${sections.map(section => `
                        <button
                            class="letter-tab ${active === section.id ? "active" : ""}"
                            data-letter="${section.id}">
                            ${section.label}
                        </button>
                    `).join("")}

                </div>

                <div class="letter-paper">

                    <div class="letter-stamp">
                        ♡
                    </div>

                    <div class="letter-date">
                        ${
                            active === "anniversary"
                                ? "15 / 06 / 26"
                                : "OPEN WHEN..."
                        }
                    </div>

                    <h1>
                        ${letter.title}
                    </h1>

                    <p class="letter-subtitle">
                        ${letter.subtitle}
                    </p>

                    <div class="letter-text">
                        ${formatLetterText(letter.text)}
                    </div>

                    <div class="letter-signature">
                        love, LOJAIN ♡
                    </div>

                </div>

            </div>
        `;

        document.getElementById("letter-back")
            .addEventListener("click", renderDesktop);

        document.querySelectorAll(".letter-tab")
            .forEach(button => {

                button.addEventListener("click", () => {
                    showLoveLetter(button.dataset.letter);
                });

            });
    }


    // ============================================================
    // MUSIC
    // ============================================================

    function showMusic() {

        computerScreen.innerHTML = `
            <div class="music-app">

                <div class="music-top">

                    <span>
                        🎵 LOVE.EXE / MUSIC
                    </span>

                    <button id="music-back">
                        ← DESKTOP
                    </button>

                </div>

                <div class="music-stage">

                    <div class="music-title">
                        MUSIC
                        <span>♡</span>
                    </div>

                    <div class="music-subtitle">
                        songs thattt remind me of us!!!!
                    </div>

                    ${music.map((song, index) => {

                        const positionStyles = [];

                        if (song.top) {
                            positionStyles.push(`top:${song.top}`);
                        }

                        if (song.bottom) {
                            positionStyles.push(`bottom:${song.bottom}`);
                        }

                        if (song.left) {
                            positionStyles.push(`left:${song.left}`);
                        }

                        if (song.right) {
                            positionStyles.push(`right:${song.right}`);
                        }

                        positionStyles.push(
                            `--rotation:${song.rotation}`
                        );

                        return `
                            <div
                                class="music-card music-card-${index}"
                                style="${positionStyles.join(";")}"
                            >

                                <div class="music-card-heart">
                                    ♡
                                </div>

                                <h2>
                                    ${escapeHTML(song.title)}
                                </h2>

                                <p>
                                    ${escapeHTML(song.artist)}
                                </p>

                                ${
                                    song.embed
                                    ? `
                                        <iframe
                                            src="${escapeAttribute(song.embed)}"
                                            title="${escapeAttribute(song.title)}"
                                            frameborder="0"
                                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                            allowfullscreen>
                                        </iframe>
                                    `
                                    : `
                                        <div class="music-placeholder">
                                            <span>♫</span>
                                            <small>
                                                ADD EMBED HERE
                                            </small>
                                        </div>
                                    `
                                }

                            </div>
                        `;

                    }).join("")}

                </div>

            </div>
        `;

        document.getElementById("music-back")
            .addEventListener("click", renderDesktop);
    }


    // ============================================================
    // FAVORITES
    // ============================================================

    function showFavorites() {

        computerScreen.innerHTML = `
            <div class="simple-app">

                <div class="simple-app-header">

                    <span>
                        🎀 LOVE.EXE / FAVORITES
                    </span>

                    <button id="favorites-back">
                        ← DESKTOP
                    </button>

                </div>

                <div class="simple-app-content">

                    <div class="big-app-heart">
                        🎀
                    </div>

                    <h1>
                        OUR FAVORITES
                    </h1>

                    <p>
                        lil facts hehe
                    </p>

                    <div class="favorite-placeholder">

                        <p>♡ a ship you like is stuilly, a ship i like isss rayemma ! </p>
                        <p>♡ your fav song is lush life and mine is any billie song </p>
                        <p>♡ your fav foods are chicken nuggets, mozzarella sticks, veggies and fruits, my favourite food is curry cheese chips  </p>
                        <p>♡ your fav drinks are dr.pepper, rootbeer or monster and mine is 7up </p>
                        <p>♡ i love everything about you <3 </p>

                    </div>

                </div>

            </div>
        `;

        document.getElementById("favorites-back")
            .addEventListener("click", renderDesktop);
    }


    // ============================================================
    // DISTANCE
    // ============================================================

    function showDistance() {

        computerScreen.innerHTML = `
            <div class="distance-window">

                <div class="distance-header">

                    <span class="distance-title">
                        ♡ LOVE.EXE / DISTANCE
                    </span>

                    <button
                        class="distance-back"
                        id="distance-back">
                        ← BACK
                    </button>

                </div>

                <div id="love-map"></div>

                <div class="distance-footer">

                    <div class="distance-locations">

                        <span>
                            🇺🇸 <strong>NORTH CAROLINA</strong>
                        </span>

                        <span class="distance-heart-line">
                            ♡ ───────── ♡
                        </span>

                        <span>
                            🇮🇪 <strong>SLIGO</strong>
                        </span>

                    </div>

                    <div class="distance-number">
                        ♡ approximately 3,500 miles apart ♡
                    </div>

                    <p>
                        even from alll the way over here, i still love you!!! ♡
                    </p>

                </div>

            </div>
        `;

        document.getElementById("distance-back")
            .addEventListener("click", renderDesktop);

        if (!document.getElementById("leaflet-css")) {

            const leafletCSS = document.createElement("link");

            leafletCSS.id = "leaflet-css";
            leafletCSS.rel = "stylesheet";
            leafletCSS.href =
                "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";

            document.head.appendChild(leafletCSS);
        }

        function createMap() {

            const mapElement =
                document.getElementById("love-map");

            if (!mapElement) return;

            if (mapInstance) {
                try {
                    mapInstance.remove();
                } catch (error) {}

                mapInstance = null;
            }

            mapInstance = L.map("love-map");

            L.tileLayer(
                "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                {
                    maxZoom: 19,
                    attribution:
                        "© OpenStreetMap contributors"
                }
            ).addTo(mapInstance);

            const northCarolina = [
                35.7596,
                -79.0193
            ];

            const sligo = [
                54.2766,
                -8.4761
            ];

            const loveRoute =
                L.polyline(
                    [
                        northCarolina,
                        sligo
                    ],
                    {
                        color: "#b84f72",
                        weight: 4,
                        dashArray: "10 10",
                        opacity: 0.9
                    }
                ).addTo(mapInstance);

            L.marker(northCarolina)
                .addTo(mapInstance)
                .bindPopup(`
                    <strong>♡ NORTH CAROLINA ♡</strong>
                    <br>
                    where you are !! ><
                `);

            L.marker(sligo)
                .addTo(mapInstance)
                .bindPopup(`
                    <strong>♡ SLIGO ♡</strong>
                    <br>
                    where i am !! :3
                `);

            mapInstance.fitBounds(
                loveRoute.getBounds(),
                {
                    padding: [50, 50]
                }
            );

            setTimeout(() => {

                if (mapInstance) {
                    mapInstance.invalidateSize();
                }

            }, 150);
        }

        if (window.L) {

            createMap();

        } else {

            const leafletScript =
                document.createElement("script");

            leafletScript.src =
                "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";

            leafletScript.onload = createMap;

            leafletScript.onerror = () => {

                const map =
                    document.getElementById("love-map");

                if (map) {

                    map.innerHTML = `
                        <div style="
                            display:flex;
                            align-items:center;
                            justify-content:center;
                            height:100%;
                            text-align:center;
                        ">
                            ♡ MAP COULDN'T LOAD :( ♡
                        </div>
                    `;
                }
            };

            document.body.appendChild(leafletScript);
        }
    }


    // ============================================================
    // SPECIAL — CLICKABLE STAR GAME
    // ============================================================

    function showSpecial() {
const messages = [

    "you are so handsome ♡",

    "I love your smile",

    "you make me feel safe",

    "you are genuinely amazing",

    "I'm so lucky to have you",

    "you make everything better",

    "I love talking to you!!",

    "you are my favorite person",

    "you make me laugh",

    "I believe in you",

    "youre doing better than you think",

    "you deserve to be loved",

    "I am proud of you",

    "youre more important to me than you could ever know",

    "I love you ♡",

    "remember that I'm always here",

    "youre my favorite notificationn",

    "youre stuck with me >:D",

    "thank you for existing",

    "youre myy little star ♡",

    "you make my days so much better",

    "I could talk to you forever",

    "you deserve every good thing",

    "I hope you know how special you are",

    "you make me smile without even trying",

    "I love all the little things about you",

    "youre my favorite person ever",

    "I am always cheering for you",

    "you make everything feel a little easier",

    "I love making memories with you",

    "you mean so much to me",

    "happy two months my love ♡"

];
      

        let foundStars = 0;

        const totalStars = 32;

        const starPositions = [

            [7, 12], [16, 25], [26, 9], [35, 18],
            [44, 8], [54, 28], [64, 12], [74, 20],
            [86, 10], [94, 31], [11, 44], [23, 58],
            [33, 39], [42, 67], [52, 48], [62, 60],
            [73, 43], [83, 68], [93, 54], [6, 76],
            [18, 87], [29, 72], [39, 91], [49, 79],
            [59, 88], [69, 76], [78, 91], [88, 81],
            [96, 72], [14, 67], [47, 36], [67, 32]
        ];

        computerScreen.innerHTML = `
            <div
                id="special-sky"
                style="
                    position:fixed;
                    inset:0;
                    background:
                        radial-gradient(
                            ellipse at center,
                            #10152c 0%,
                            #050713 55%,
                            #000 100%
                        );
                    overflow:hidden;
                    z-index:99999;
                    color:white;
                    font-family:Tahoma,Arial,sans-serif;
                "
            >

                <div
                    style="
                        position:absolute;
                        top:15px;
                        left:20px;
                        right:20px;
                        display:flex;
                        align-items:center;
                        justify-content:space-between;
                        z-index:20;
                    "
                >

                    <div>
                        <strong
                            style="
                                font-size:16px;
                                letter-spacing:2px;
                            "
                        >
                            ⭐ STARSS
                        </strong>

                        <div
                            style="
                                font-size:11px;
                                opacity:.75;
                                margin-top:4px;
                            "
                        >
                            click the stars to find littttle messages <33
                        </div>
                    </div>

                    <button id="special-back">
                        ← DESKTOP
                    </button>

                </div>

                <div
                    style="
                        position:absolute;
                        top:75px;
                        left:50%;
                        transform:translateX(-50%);
                        z-index:10;
                        font-size:12px;
                        letter-spacing:2px;
                    "
                >
                    STARS FOUND:
                    <strong id="stars-found">0</strong>
                    / ${totalStars}
                </div>

                <div id="star-field"></div>

                <div
                    id="star-message"
                    style="
                        display:none;
                        position:absolute;
                        left:50%;
                        top:50%;
                        transform:translate(-50%,-50%);
                        width:min(500px,80vw);
                        padding:25px;
                        background:
                            rgba(8,10,25,.96);
                        border:1px solid
                            rgba(255,255,255,.6);
                        box-shadow:
                            0 0 35px
                            rgba(255,255,255,.2);
                        text-align:center;
                        z-index:50;
                    "
                >

                    <div
                        style="
                            font-size:35px;
                            margin-bottom:15px;
                        "
                    >
                        ✦
                    </div>

                    <p
                        id="star-message-text"
                        style="
                            line-height:1.7;
                            font-size:14px;
                        "
                    ></p>

                </div>

            </div>
        `;

        const starField =
            document.getElementById("star-field");

        starPositions.forEach((position, index) => {

            const star =
                document.createElement("button");

            star.className = "special-star";
            star.type = "button";

            star.dataset.index = index;

            const size =
                14 + Math.floor(Math.random() * 12);

            star.style.cssText = `
                position:absolute;
                left:${position[0]}%;
                top:${position[1]}%;
                width:${size + 12}px;
                height:${size + 12}px;
                padding:0;
                margin:0;
                border:none;
                background:transparent;
                color:#fffdf0;
                font-size:${size}px;
                cursor:pointer;
                text-shadow:
                    0 0 4px #fff,
                    0 0 9px #fff,
                    0 0 18px #cbdcff,
                    0 0 30px #8ba7ff;
                animation:
                    starTwinkle
                    ${1.2 + Math.random() * 2}s
                    ease-in-out infinite alternate;
                z-index:5;
            `;

            star.textContent =
                Math.random() > .5
                    ? "★"
                    : "✦";

            star.addEventListener("click", () => {

                if (star.dataset.found === "true") {
                    return;
                }

                star.dataset.found = "true";

                foundStars++;

                document.getElementById(
                    "stars-found"
                ).textContent = foundStars;

                const message =
                    messages[
                        index % messages.length
                    ];

                const messageBox =
                    document.getElementById(
                        "star-message"
                    );

                const messageText =
                    document.getElementById(
                        "star-message-text"
                    );

                messageText.textContent =
                    message;

                messageBox.style.display =
                    "block";

                star.style.opacity = "0";
                star.style.pointerEvents = "none";

                setTimeout(() => {

                    messageBox.style.display =
                        "none";

                }, 2500);

                if (foundStars === totalStars) {

                    setTimeout(() => {

                        messageText.textContent =
                            "ooo yayyy!! you found every star ♡]";

                        messageBox.style.display =
                            "block";

                    }, 2600);
                }

            });

            starField.appendChild(star);
        });

        const starStyle =
            document.createElement("style");

        starStyle.id =
            "love-special-star-style";

        starStyle.textContent = `
            @keyframes starTwinkle {

                0% {
                    opacity:.35;
                    transform:scale(.8);
                }

                50% {
                    opacity:1;
                }

                100% {
                    opacity:.55;
                    transform:scale(1.2);
                }

            }

            .special-star:hover {
                transform:scale(1.5) !important;
            }
        `;

        document.head.appendChild(starStyle);

        document.getElementById("special-back")
            .addEventListener("click", renderDesktop);
    }

// ============================================================
// OUR FILES — FILE EXPLORER MINI GAME
// ============================================================

function showOurFiles() {

    const state = {
        path: ["OUR FILES"],
        found: new Set()
    };

    const fileSystem = {

        "OUR FILES": {
            type: "folder",
            children: [
                { name: "IMPORTANT", type: "folder" },
                { name: "MEMORIES", type: "folder" },
                { name: "RANDOM STUFF", type: "folder" },
                { name: "DO NOT OPEN", type: "folder" },
                { name: "OLD FILES", type: "folder" },
                { name: "SECRET", type: "folder" }
            ]
        },

        "IMPORTANT": {
            type: "folder",
            children: [
                {
                    name: "read_me.txt",
                    type: "file",
                    secret: 1,
                    message: "yourr my favorite person !!"
                },
                {
                    name: "anniversary_notes",
                    type: "folder"
                },
                {
                    name: "important_document.txt",
                    type: "file",
                    secret: 2,
                    message: "I hope we get to make a million more memories together !"
                }
            ]
        },

        "anniversary_notes": {
            type: "folder",
            children: [
                {
                    name: "15-06-26.txt",
                    type: "file",
                    secret: 3,
                    message: "this date means everything to me<33"
                },
                {
                    name: "something_i_wrote.txt",
                    type: "file",
                    secret: 4,
                    message: "I love you more than this file can contain"
                },
                {
                    name: "backup.txt",
                    type: "file"
                }
            ]
        },

        "MEMORIES": {
            type: "folder",
            children: [
                { name: "PHOTOS", type: "folder" },
                { name: "VIDEOS", type: "folder" },
                { name: "SCREENSHOTS", type: "folder" },
                {
                    name: "memory.txt",
                    type: "file",
                    secret: 5,
                    message: "remember the first time we met? :3 i do !!"
                }
            ]
        },

        "PHOTOS": {
            type: "folder",
            children: [
                { name: "IMG_0001.jpg", type: "file" },
                { name: "IMG_0002.jpg", type: "file" },
                {
                    name: "IMG_0003.jpg",
                    type: "file",
                    secret: 6,
                    message: " dude your genuinely everything i couldve ever wanted in a person and more<3 "
                },
                { name: "IMG_0004.jpg", type: "file" },
                { name: "IMG_0005.jpg", type: "file" }
            ]
        },

        "VIDEOS": {
            type: "folder",
            children: [
                { name: "video_1.mp4", type: "file" },
                {
                    name: "video_2.mp4",
                    type: "file",
                    secret: 7,
                    message: "your smile is literally the cutest thing ive ever seen in my entire life aww so cute ur lit only 3apples tall"
                },
                { name: "video_3.mp4", type: "file" }
            ]
        },

        "SCREENSHOTS": {
            type: "folder",
            children: [
                { name: "chat_01.png", type: "file" },
                { name: "chat_02.png", type: "file" },
                {
                    name: "chat_03.png",
                    type: "file",
                    secret: 8,
                    message: "you say im crine allll the time lmfao"
                },
                { name: "chat_04.png", type: "file" }
            ]
        },

        "RANDOM STUFF": {
            type: "folder",
            children: [
                { name: "stuff", type: "folder" },
                { name: "old", type: "folder" },
                {
                    name: "literally_nothing.txt",
                    type: "file"
                },
                {
                    name: "why_is_this_here.txt",
                    type: "file",
                    secret: 9,
                    message: "because I wanted to hide something here hehe x3"
                }
            ]
        },

        "stuff": {
            type: "folder",
            children: [
                { name: "thing.txt", type: "file" },
                { name: "thing2.txt", type: "file" },
                {
                    name: "hidden.txt",
                    type: "file",
                    secret: 10,
                    message: "ouuu shiii you found the hidden one"
                }
            ]
        },

        "old": {
            type: "folder",
            children: [
                { name: "old_notes", type: "folder" },
                { name: "old_backup.zip", type: "file" }
            ]
        },

        "old_notes": {
            type: "folder",
            children: [
                { name: "note1.txt", type: "file" },
                {
                    name: "note2.txt",
                    type: "file",
                    secret: 11,
                    message: "you can stop looking nowww theres nothing more...right???"
                },
                { name: "note3.txt", type: "file" }
            ]
        },

        "DO NOT OPEN": {
            type: "folder",
            children: [
                { name: "seriously.txt", type: "file" },
                {
                    name: "you_opened_it.txt",
                    type: "file",
                    secret: 12,
                    message: "whatare u doing here omg ur perfect ilysm marry me plz"
                },
                { name: "deeper", type: "folder" }
            ]
        },

        "deeper": {
            type: "folder",
            children: [
                { name: "huh.txt", type: "file" },
                {
                    name: "secret_secret.txt",
                    type: "file",
                    secret: 13,
                    message: "i love you so fucking much man"
                },
                {
                    name: "final.txt",
                    type: "file",
                    secret: 14,
                    message: "im gonna SLIME OUT anyone who tries to get involved w u romantically hmph i love you so much and i want to be the only one who gets to do that!!!!!!"
                }
            ]
        },

        "OLD FILES": {
            type: "folder",
            children: [
                { name: "2024", type: "folder" },
                { name: "2025", type: "folder" },
                { name: "misc_old.txt", type: "file" }
            ]
        },

        "2024": {
            type: "folder",
            children: [
                {
                    name: "old_memory.txt",
                    type: "file",
                    secret: 15,
                    message: "when we first met i never thought we would be here now but im so glad we are<3 "
                },
                { name: "random.txt", type: "file" }
            ]
        },

        "2025": {
            type: "folder",
            children: [
                { name: "memory1.txt", type: "file" },
                {
                    name: "memory2.txt",
                    type: "file",
                    secret: 16,
                    message: "remember that time u said u loved me for the first timeeee?? awwww so cutee"
                },
                { name: "memory3.txt", type: "file" }
            ]
        },

        "SECRET": {
            type: "folder",
            children: [
                { name: "nothing_here.txt", type: "file" },
                { name: "maybe_here.txt", type: "file" },
                { name: "keep_looking", type: "folder" }
            ]
        },

        "keep_looking": {
            type: "folder",
            children: [
                {
                    name: "secret1.txt",
                    type: "file",
                    secret: 17,
                    message: "you're oddly good at this??"
                },
                { name: "secret2.txt", type: "file" },
                { name: "secret3.txt", type: "file" },
                {
                    name: "THE_REAL_SECRET.txt",
                    type: "file",
                    secret: 18,
                    message: "I love you more #iwintheilymarguement"
                }
            ]
        }
    };


    // ============================================================
    // RENDER THE FILE EXPLORER
    // ============================================================

    function renderFiles() {

        computerScreen.innerHTML = `
            <div
                id="files-game"
                style="
                    position:fixed;
                    inset:0;
                    background:#d4d0c8;
                    z-index:99999;
                    color:#000;
                    font-family:Tahoma,Arial,sans-serif;
                    display:flex;
                    flex-direction:column;
                "
            >

                <div
                    style="
                        height:30px;
                        flex-shrink:0;
                        background:
                            linear-gradient(
                                to bottom,
                                #3c7dcc,
                                #2457a5,
                                #17458d
                            );
                        color:#fff;
                        display:flex;
                        align-items:center;
                        justify-content:space-between;
                        padding:0 7px;
                        font-size:11px;
                        font-weight:bold;
                    "
                >
                    <span>
                        📁 LOVE.EXE / OUR FILES
                    </span>

                    <button id="files-back">
                        ← DESKTOP
                    </button>
                </div>

                <div
                    style="
                        background:#ece9d8;
                        border-bottom:2px solid #808080;
                        padding:8px;
                        display:flex;
                        align-items:center;
                        gap:8px;
                        flex-wrap:wrap;
                    "
                >

                    <button id="files-up">
                        ↑ UP
                    </button>

                    <button id="files-home">
                        🏠 HOME
                    </button>

                    <span
                        id="files-breadcrumb"
                        style="
                            padding:4px 8px;
                            background:white;
                            border:2px inset #aaa;
                            flex:1;
                            min-width:150px;
                            overflow:hidden;
                        "
                    ></span>

                </div>

                <div
                    style="
                        background:#f4f2e9;
                        padding:8px;
                        border-bottom:1px solid #999;
                        display:flex;
                        justify-content:space-between;
                        flex-wrap:wrap;
                        gap:8px;
                    "
                >

                    <span>
                        📁
                        <strong id="files-current-name">
                            OUR FILES
                        </strong>
                    </span>

                    <span>
                        🔎 SECRET MESSAGES FOUND:
                        <strong id="secret-counter">
                            ${state.found.size}
                        </strong>
                        / 18
                    </span>

                </div>

                <div
                    id="files-content"
                    style="
                        flex:1;
                        overflow-y:auto;
                        padding:18px;
                        background:#fff;
                    "
                ></div>

            </div>
        `;


        // DESKTOP
        document.getElementById("files-back")
            .addEventListener(
                "click",
                renderDesktop
            );


        // HOME
        document.getElementById("files-home")
            .addEventListener(
                "click",
                () => {

                    state.path = ["OUR FILES"];

                    renderFiles();
                }
            );


        // UP
        document.getElementById("files-up")
            .addEventListener(
                "click",
                () => {

                    if (state.path.length > 1) {

                        state.path.pop();

                        renderFiles();
                    }
                }
            );


        renderFolder();
    }


    // ============================================================
    // GET CURRENT FOLDER
    // ============================================================

    function getCurrentFolder() {

        const currentName =
            state.path[
                state.path.length - 1
            ];

        return fileSystem[currentName];
    }


    // ============================================================
    // RENDER CURRENT FOLDER
    // ============================================================

    function renderFolder() {

        const folder =
            getCurrentFolder();

        const content =
            document.getElementById(
                "files-content"
            );

        if (!folder || !content) {
            return;
        }


        document.getElementById(
            "files-breadcrumb"
        ).textContent =
            state.path.join(" > ");


        document.getElementById(
            "files-current-name"
        ).textContent =
            state.path[
                state.path.length - 1
            ];


        document.getElementById(
            "secret-counter"
        ).textContent =
            state.found.size;


        if (
            !folder.children ||
            folder.children.length === 0
        ) {

            content.innerHTML = `
                <div
                    style="
                        padding:40px;
                        text-align:center;
                        color:#777;
                    "
                >
                    This folder is empty.
                </div>
            `;

            return;
        }


        content.innerHTML = `
            <div
                style="
                    display:grid;
                    grid-template-columns:
                        repeat(
                            auto-fill,
                            minmax(170px,1fr)
                        );
                    gap:8px;
                "
            >

                ${folder.children.map(
                    (item, index) => {

                        const isFolder =
                            item.type === "folder";

                        return `
                            <button
                                class="file-item"
                                data-index="${index}"
                                style="
                                    min-height:110px;
                                    display:flex;
                                    flex-direction:column;
                                    align-items:center;
                                    justify-content:center;
                                    gap:7px;
                                    text-align:center;
                                    background:#f8f8f8;
                                    cursor:pointer;
                                "
                            >

                                <span
                                    style="
                                        font-size:43px;
                                    "
                                >
                                    ${
                                        isFolder
                                            ? "📁"
                                            : getFileIcon(
                                                item.name
                                            )
                                    }
                                </span>

                                <span>
                                    ${escapeHTML(
                                        item.name
                                    )}
                                </span>

                            </button>
                        `;
                    }
                ).join("")}

            </div>
        `;


        // ONE CLICK HANDLER ONLY
        content
            .querySelectorAll(".file-item")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const item =
                            folder.children[
                                Number(
                                    button.dataset.index
                                )
                            ];


                        if (
                            item.type === "folder"
                        ) {

                            state.path.push(
                                item.name
                            );

                            renderFiles();

                        } else {

                            openFile(item);

                        }

                    }
                );

            });
    }


    // ============================================================
    // OPEN FILE
    // ============================================================

    function openFile(file) {

        // --------------------------------------------------------
        // SECRET FILE
        // --------------------------------------------------------

        if (file.secret) {

            // Remember that this secret was found
            state.found.add(file.secret);


            computerScreen.innerHTML = `
                <div
                    style="
                        position:fixed;
                        inset:0;
                        background:#d4d0c8;
                        z-index:100000;
                        display:flex;
                        flex-direction:column;
                        color:#000;
                        font-family:Tahoma,Arial,sans-serif;
                    "
                >

                    <div
                        style="
                            height:30px;
                            flex-shrink:0;
                            background:
                                linear-gradient(
                                    to bottom,
                                    #3c7dcc,
                                    #2457a5,
                                    #17458d
                                );
                            color:#fff;
                            display:flex;
                            align-items:center;
                            justify-content:space-between;
                            padding:0 8px;
                            font-weight:bold;
                        "
                    >

                        <span>
                            📄 ${escapeHTML(file.name)}
                        </span>

                        <button id="secret-close">
                            X
                        </button>

                    </div>


                    <div
                        style="
                            flex:1;
                            background:#fffef4;
                            padding:60px 25px;
                            overflow:auto;
                            text-align:center;
                        "
                    >

                        <div
                            style="
                                font-size:60px;
                            "
                        >
                            💌
                        </div>


                        <h1>
                            SECRET MESSAGE FOUND
                        </h1>


                        <p
                            style="
                                max-width:600px;
                                margin:30px auto;
                                font-family:Georgia,serif;
                                font-size:18px;
                                line-height:1.8;
                            "
                        >
                            ${escapeHTML(
                                file.message
                            )}
                        </p>


                        <p>
                            SECRET
                            ${file.secret}
                            / 18
                        </p>


                        <button id="secret-back">
                            ← BACK TO FILES
                        </button>

                    </div>

                </div>
            `;


            // X BUTTON
            document.getElementById(
                "secret-close"
            ).addEventListener(
                "click",
                () => {

                    renderFiles();

                }
            );


            // BACK BUTTON
            document.getElementById(
                "secret-back"
            ).addEventListener(
                "click",
                () => {

                    renderFiles();

                }
            );


            return;
        }


        // --------------------------------------------------------
        // NORMAL FILE
        // --------------------------------------------------------

        computerScreen.innerHTML = `
            <div
                style="
                    position:fixed;
                    inset:0;
                    background:#d4d0c8;
                    z-index:100000;
                    display:flex;
                    flex-direction:column;
                    color:#000;
                    font-family:Tahoma,Arial,sans-serif;
                "
            >

                <div
                    style="
                        height:30px;
                        flex-shrink:0;
                        background:
                            linear-gradient(
                                to bottom,
                                #3c7dcc,
                                #2457a5,
                                #17458d
                            );
                        color:#fff;
                        display:flex;
                        align-items:center;
                        justify-content:space-between;
                        padding:0 8px;
                        font-weight:bold;
                    "
                >

                    <span>
                        ${getFileIcon(file.name)}
                        ${escapeHTML(file.name)}
                    </span>

                    <button id="normal-file-close">
                        X
                    </button>

                </div>


                <div
                    style="
                        flex:1;
                        background:#fff;
                        display:flex;
                        flex-direction:column;
                        align-items:center;
                        justify-content:center;
                        padding:30px;
                        text-align:center;
                    "
                >

                    <div
                        style="
                            font-size:70px;
                            margin-bottom:20px;
                        "
                    >
                        ${getFileIcon(file.name)}
                    </div>

                    <h2>
                        ${escapeHTML(file.name)}
                    </h2>

                    <p
                        style="
                            color:#666;
                        "
                    >
                        This file doesn't have
                        anything LMFAOOO
                    </p>

                    <button id="normal-file-back">
                        ← BACK TO FILES
                    </button>

                </div>

            </div>
        `;


        document.getElementById(
            "normal-file-close"
        ).addEventListener(
            "click",
            () => {

                renderFiles();

            }
        );


        document.getElementById(
            "normal-file-back"
        ).addEventListener(
            "click",
            () => {

                renderFiles();

            }
        );
    }


    // ============================================================
    // START FILE EXPLORER
    // ============================================================

    renderFiles();
}


// ============================================================
// FILE ICONS
// ============================================================

function getFileIcon(name) {

    const lower =
        name.toLowerCase();


    if (
        lower.endsWith(".jpg") ||
        lower.endsWith(".jpeg") ||
        lower.endsWith(".png") ||
        lower.endsWith(".gif")
    ) {
        return "🖼️";
    }


    if (
        lower.endsWith(".mp4") ||
        lower.endsWith(".mov") ||
        lower.endsWith(".webm")
    ) {
        return "🎬";
    }


    if (lower.endsWith(".zip")) {
        return "📦";
    }


    if (lower.endsWith(".txt")) {
        return "📄";
    }


    return "📃";
}

// ============================================================
// GALLERY — 42 ACTUAL F/O IMAGES
// ============================================================

function showGallery() {

    const galleryImages = [];

    for (let i = 1; i <= 42; i++) {

        galleryImages.push({
            number: i,
            title: `F/O IMAGE ${String(i).padStart(2, "0")}`,
            image: `F00${i}.jpg`
        });
    }

    computerScreen.innerHTML = `
        <div
            style="
                position:fixed;
                inset:0;
                background:#ece9d8;
                z-index:99999;
                display:flex;
                flex-direction:column;
                color:#000;
            "
        >

            <div
                style="
                    height:30px;
                    flex-shrink:0;
                    background:
                        linear-gradient(
                            to bottom,
                            #3c7dcc,
                            #17458d
                        );
                    color:#fff;
                    display:flex;
                    align-items:center;
                    justify-content:space-between;
                    padding:0 7px;
                    font-size:11px;
                    font-weight:bold;
                "
            >

                <span>
                    🖼️ LOVE.EXE / GALLERY
                </span>

                <button id="gallery-back">
                    ← DESKTOP
                </button>

            </div>

            <div
                style="
                    padding:15px;
                    text-align:center;
                    background:#d4d0c8;
                    border-bottom:2px solid #888;
                "
            >

                <h1
                    style="
                        margin:0;
                        font-family:Georgia,serif;
                    "
                >
                    F/O GALLERY ♡
                </h1>

                <p>
                    [42 F/O IMAGES]
                </p>

            </div>

            <div
                style="
                    flex:1;
                    overflow-y:auto;
                    padding:20px;
                "
            >

                <div
                    style="
                        display:grid;
                        grid-template-columns:
                            repeat(
                                auto-fill,
                                minmax(150px,1fr)
                            );
                        gap:15px;
                    "
                >

                    ${galleryImages.map(image => `
                        <button
                            class="gallery-placeholder"
                            data-image="${image.number}"
                            style="
                                padding:8px;
                                background:#fff;
                                border:2px solid;
                                border-color:
                                    #fff #555
                                    #555 #fff;
                                display:flex;
                                flex-direction:column;
                                align-items:center;
                                cursor:pointer;
                            "
                        >

                            <img
                                src="${image.image}"
                                alt="${image.title}"
                                style="
                                    width:100%;
                                    height:125px;
                                    object-fit:cover;
                                    display:block;
                                "
                            >

                            <strong
                                style="
                                    margin-top:8px;
                                    font-size:11px;
                                "
                            >
                                ${image.title}
                            </strong>

                        </button>
                    `).join("")}

                </div>

            </div>

        </div>
    `;

    document.getElementById("gallery-back")
        .addEventListener("click", renderDesktop);

    document.querySelectorAll(
        ".gallery-placeholder"
    ).forEach(button => {

        button.addEventListener("click", () => {

            const number = button.dataset.image;

            const image =
                galleryImages.find(
                    img => img.number == number
                );

            openGalleryImage(image);

        });

    });
}


// ============================================================
// OPEN GALLERY IMAGE
// ============================================================

function openGalleryImage(image) {

    computerScreen.innerHTML = `

        <div
            style="
                position:fixed;
                inset:0;
                background:#ece9d8;
                z-index:100000;
                display:flex;
                flex-direction:column;
                color:#000;
            "
        >

            <div
                style="
                    height:30px;
                    background:
                        linear-gradient(
                            to bottom,
                            #3c7dcc,
                            #17458d
                        );
                    color:#fff;
                    display:flex;
                    align-items:center;
                    justify-content:space-between;
                    padding:0 7px;
                    font-size:11px;
                    font-weight:bold;
                "
            >

                <span>
                    🖼️ PHOTO VIEWER — ${image.title}
                </span>

                <button id="photo-back">
                    ← BACK
                </button>

            </div>

            <div
                style="
                    flex:1;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    padding:25px;
                    background:#808080;
                    overflow:auto;
                "
            >

                <div
                    style="
                        background:#fff;
                        padding:10px;
                        border:2px solid;
                        border-color:
                            #fff #333
                            #333 #fff;
                        box-shadow:4px 4px 0 #222;
                    "
                >

                    <img
                        src="${image.image}"
                        alt="${image.title}"
                        style="
                            max-width:80vw;
                            max-height:75vh;
                            display:block;
                            object-fit:contain;
                        "
                    >

                    <div
                        style="
                            text-align:center;
                            padding-top:8px;
                            font-family:Arial,sans-serif;
                            font-size:11px;
                        "
                    >
                        ${image.title} ♡
                    </div>

                </div>

            </div>

        </div>
    `;

    document.getElementById("photo-back")
        .addEventListener("click", showGallery);
}


// ============================================================
// OPEN GALLERY IMAGE
// ============================================================

function openGalleryImage(image) {

    computerScreen.innerHTML = `

        <div
            style="
                position:fixed;
                inset:0;
                background:#ece9d8;
                z-index:100000;
                display:flex;
                flex-direction:column;
                color:#000;
            "
        >

            <div
                style="
                    height:30px;
                    background:
                        linear-gradient(
                            to bottom,
                            #3c7dcc,
                            #17458d
                        );
                    color:#fff;
                    display:flex;
                    align-items:center;
                    justify-content:space-between;
                    padding:0 7px;
                    font-size:11px;
                    font-weight:bold;
                "
            >

                <span>
                    🖼️ PHOTO VIEWER — ${image.title}
                </span>

                <button id="photo-back">
                    ← BACK
                </button>

            </div>

            <div
                style="
                    flex:1;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    padding:25px;
                    background:#808080;
                    overflow:auto;
                "
            >

                <div
                    style="
                        background:#fff;
                        padding:10px;
                        border:2px solid;
                        border-color:
                            #fff #333
                            #333 #fff;
                        box-shadow:4px 4px 0 #222;
                    "
                >

                    <img
                        src="${image.image}"
                        alt="${image.title}"
                        style="
                            max-width:80vw;
                            max-height:75vh;
                            display:block;
                            object-fit:contain;
                        "
                    >

                    <div
                        style="
                            text-align:center;
                            padding-top:8px;
                            font-family:Arial,sans-serif;
                            font-size:11px;
                        "
                    >
                        ${image.title} ♡
                    </div>

                </div>

            </div>

        </div>
    `;

    document.getElementById("photo-back")
        .addEventListener("click", showGallery);
}

    // ============================================================
    // NOTES
    // ============================================================

    function showNotes() {

        computerScreen.innerHTML = `
            <div
                style="
                    position:fixed;
                    inset:0;
                    background:#f5f0d9;
                    z-index:99999;
                    overflow:auto;
                "
            >

                <div
                    style="
                        height:30px;
                        background:
                            linear-gradient(
                                to bottom,
                                #3c7dcc,
                                #17458d
                            );
                        color:#fff;
                        display:flex;
                        align-items:center;
                        justify-content:space-between;
                        padding:0 7px;
                        font-weight:bold;
                    "
                >

                    <span>
                        💬 LOVE.EXE / NOTES
                    </span>

                    <button id="notes-back">
                        ← DESKTOP
                    </button>

                </div>

                <div
                    style="
                        max-width:800px;
                        margin:30px auto;
                        padding:30px;
                    "
                >

                    <h1
                        style="
                            font-family:Georgia,serif;
                            text-align:center;
                        "
                    >
                        LITTLE NOTES ♡
                    </h1>

                    <div
                        style="
                            display:grid;
                            gap:15px;
                        "
                    >

                        <div class="note-placeholder">
                            ♡ i love your smile
                        </div>

                        <div class="note-placeholder">
                            ♡ i love your laugh
                        </div>

                        <div class="note-placeholder">
                            ♡ i love your voice
                        </div>

                        <div class="note-placeholder">
                            ♡ i love your eyes
                        </div>

                        <div class="note-placeholder">
                            ♡ i love your hair
                        </div>

                        <div class="note-placeholder">
                            ♡ i love you so much and i love all the little things about you that make you so special to me
                        </div>

                    </div>

                </div>

            </div>
        `;

        document.getElementById("notes-back")
            .addEventListener("click", renderDesktop);
    }


    // ============================================================
    // GAMES FOLDER
    // ============================================================

    function showGames() {

        computerScreen.innerHTML = `
            <div class="games-folder">

                <div class="games-header">

                    <div>
                        <span class="games-folder-title">
                            🎮 LOVE.EXE
                        </span>

                        <span class="games-folder-subtitle">
                            / GAMES
                        </span>
                    </div>

                    <button id="games-back">
                        ← DESKTOP
                    </button>

                </div>

                <div class="games-content">

                    <div class="games-intro">

                        <div class="games-heart">
                            ♡
                        </div>

                        <h1>
                            A BUNCHA GAMESS
                        </h1>

                        <p>
                            pick something to play!!!!
                        </p>

                    </div>

                    <div class="game-grid">

                        <div class="game-card" id="heart-rush">

                            <div class="game-big-icon">
                                💨
                            </div>

                            <div class="game-card-text">
                                <h2>HEART RUSH</h2>

                                <p>
                                    catch as many hearts as you can ♡
                                </p>

                                <span class="game-launch">
                                    PLAY →
                                </span>
                            </div>

                        </div>

                        <div class="game-card" id="heart-memory">

                            <div class="game-big-icon">
                                🃏
                            </div>

                            <div class="game-card-text">
                                <h2>MEMORY</h2>

                                <p>
                                    remember where the hearts are ♡
                                </p>

                                <span class="game-launch">
                                    PLAY →
                                </span>
                            </div>

                        </div>

                        <div class="game-card" id="love-quiz">

                            <div class="game-big-icon">
                                💌
                            </div>

                            <div class="game-card-text">
                                <h2>QUIZ</h2>

                                <p>
                                    how well do you know mee?
                                </p>

                                <span class="game-launch">
                                    PLAY →
                                </span>
                            </div>

                        </div>

                        <div class="game-card" id="love-dash">

                            <div class="game-big-icon">
                                💗
                            </div>

                            <div class="game-card-text">
                                <h2>LOVE DASH</h2>

                                <p>
                                    jump, dodge & survive!
                                </p>

                                <span class="game-launch">
                                    PLAY →
                                </span>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        `;

        document.getElementById("games-back")
            .addEventListener("click", renderDesktop);

        document.getElementById("heart-rush")
            .addEventListener("click", startHeartRush);

        document.getElementById("heart-memory")
            .addEventListener("click", startHeartMemory);

        document.getElementById("love-quiz")
            .addEventListener("click", startLoveQuiz);

        document.getElementById("love-dash")
            .addEventListener("click", startLoveDash);
    }


    // ============================================================
    // HEART RUSH
    // ============================================================

    function startHeartRush() {

        let score = 0;
        let timeLeft = 20;
        let gameRunning = false;
        let timer = null;

        computerScreen.innerHTML = `
            <div class="game-window heart-rush-window">

                <div class="game-header">

                    <span class="game-title">
                        💨 HEART RUSH
                    </span>

                    <button
                        class="game-back"
                        id="rush-back">
                        ← GAMES
                    </button>

                </div>

                <div class="heart-rush-content">

                    <div class="rush-stats">

                        <span>
                            TIME:
                            <b id="rush-time">20</b>
                        </span>

                        <span>
                            HEARTS:
                            <b id="rush-score">0</b>
                        </span>

                    </div>

                    <div
                        class="rush-area"
                        id="rush-area">

                        <div class="rush-message">

                            <div class="rush-message-heart">
                                ♡
                            </div>

                            <strong>
                                READY?
                            </strong>

                            <p>
                                catch the hearts before
                                time runs out
                            </p>

                        </div>

                    </div>

                    <button
                        class="rush-start-button"
                        id="rush-start">
                        START ♡
                    </button>

                </div>

            </div>
        `;

        const area =
            document.getElementById("rush-area");

        const scoreDisplay =
            document.getElementById("rush-score");

        const timeDisplay =
            document.getElementById("rush-time");

        const startButton =
            document.getElementById("rush-start");


        function spawnRushHeart() {

            if (!gameRunning || timeLeft <= 0) {
                return;
            }

            const heart =
                document.createElement("button");

            heart.className = "rush-heart";
            heart.type = "button";
            heart.textContent = "♡";

            heart.style.left =
                Math.random() * 88 + "%";

            heart.style.top =
                Math.random() * 82 + "%";

            heart.addEventListener("click", event => {

                event.stopPropagation();

                if (!gameRunning) return;

                score++;

                scoreDisplay.textContent =
                    score;

                heart.remove();

                spawnRushHeart();
            });

            area.appendChild(heart);
        }


        function endGame() {

            gameRunning = false;

            if (timer) {
                clearInterval(timer);
                timer = null;
            }

            const message =
                score >= 20
                    ? "YOU'RE A LOVE MACHINE 💗"
                    : score >= 12
                        ? "THAT WAS CUTE ♡"
                        : "AWWW, GOOD TRY ♡";

            area.innerHTML = `
                <div class="game-result">

                    <div class="result-heart">
                        ♡
                    </div>

                    <h2>
                        TIME'S UP!
                    </h2>

                    <p>
                        you caught
                        <strong>${score}</strong>
                        hearts
                    </p>

                    <p>
                        ${message}
                    </p>

                </div>
            `;

            startButton.disabled = false;
            startButton.textContent =
                "PLAY AGAIN ♡";
        }


        function startGame() {

            if (gameRunning) return;

            score = 0;
            timeLeft = 20;
            gameRunning = true;

            scoreDisplay.textContent = "0";
            timeDisplay.textContent = "20";

            area.innerHTML = "";

            startButton.disabled = true;
            startButton.textContent =
                "HEARTS INCOMING...";

            for (let i = 0; i < 5; i++) {
                spawnRushHeart();
            }

            timer = setInterval(() => {

                if (!gameRunning) {

                    clearInterval(timer);
                    timer = null;

                    return;
                }

                timeLeft--;

                timeDisplay.textContent =
                    timeLeft;

                for (let i = 0; i < 2; i++) {
                    spawnRushHeart();
                }

                if (timeLeft <= 0) {
                    endGame();
                }

            }, 1000);
        }


        startButton.addEventListener(
            "click",
            startGame
        );


        document.getElementById("rush-back")
            .addEventListener("click", () => {

                if (timer) {
                    clearInterval(timer);
                }

                timer = null;
                gameRunning = false;

                showGames();
            });
    }


    // ============================================================
    // MEMORY
    // ============================================================

    function startHeartMemory() {

        const symbols = [
            "♡", "♡",
            "♥", "♥",
            "💗", "💗",
            "💖", "💖",
            "💕", "💕",
            "💘", "💘"
        ];

        const cards =
            [...symbols].sort(
                () => Math.random() - 0.5
            );

        let flipped = [];
        let matched = 0;
        let moves = 0;
        let locked = true;

        computerScreen.innerHTML = `
            <div class="game-window memory-window">

                <div class="game-header">

                    <span class="game-title">
                        🃏 MEMORY
                    </span>

                    <button
                        class="game-back"
                        id="memory-back">
                        ← GAMES
                    </button>

                </div>

                <div class="memory-content">

                    <div class="memory-stats">

                        <span>
                            MATCHES:
                            <b id="memory-matches">0</b>/6
                        </span>

                        <span>
                            MOVES:
                            <b id="memory-moves">0</b>
                        </span>

                    </div>

                    <p
                        class="memory-instruction"
                        id="memory-instruction">
                        MEMORIZE THE CARDS...
                    </p>

                    <div
                        class="memory-grid"
                        id="memory-grid">
                    </div>

                </div>

            </div>
        `;

        const grid =
            document.getElementById("memory-grid");

        const instruction =
            document.getElementById(
                "memory-instruction"
            );

        cards.forEach((symbol, index) => {

            const card =
                document.createElement("button");

            card.type = "button";

            card.className =
                "memory-card flipped";

            card.dataset.index = index;

            card.innerHTML = `
                <span class="memory-card-back">
                    ♡
                </span>

                <span class="memory-card-front">
                    ${symbol}
                </span>
            `;

            card.addEventListener("click", () => {

                if (
                    locked ||
                    card.classList.contains("flipped") ||
                    card.classList.contains("matched")
                ) {
                    return;
                }

                card.classList.add("flipped");

                flipped.push({
                    card,
                    symbol
                });

                if (flipped.length !== 2) {
                    return;
                }

                moves++;

                document.getElementById(
                    "memory-moves"
                ).textContent = moves;

                const first = flipped[0];
                const second = flipped[1];

                if (first.symbol === second.symbol) {

                    first.card.classList.add(
                        "matched"
                    );

                    second.card.classList.add(
                        "matched"
                    );

                    matched++;

                    document.getElementById(
                        "memory-matches"
                    ).textContent = matched;

                    flipped = [];

                    if (matched === 6) {

                        locked = true;

                        setTimeout(
                            memoryWin,
                            500
                        );
                    }

                } else {

                    locked = true;

                    setTimeout(() => {

                        if (
                            !document.getElementById(
                                "memory-grid"
                            )
                        ) {
                            return;
                        }

                        first.card.classList.remove(
                            "flipped"
                        );

                        second.card.classList.remove(
                            "flipped"
                        );

                        flipped = [];

                        locked = false;

                    }, 800);
                }

            });

            grid.appendChild(card);
        });


        setTimeout(() => {

            if (
                !document.getElementById(
                    "memory-grid"
                )
            ) {
                return;
            }

            document.querySelectorAll(
                ".memory-card"
            ).forEach(card => {

                card.classList.remove(
                    "flipped"
                );

            });

            locked = false;

            instruction.textContent =
                "DO YOU REMEMBER WHERE THEY WERE? :00";

        }, 2500);


        function memoryWin() {

            if (
                !document.getElementById(
                    "memory-grid"
                )
            ) {
                return;
            }

            locked = true;

            grid.innerHTML = `
                <div class="game-result">

                    <div class="result-heart">
                        💗
                    </div>

                    <h2>
                        YOU DID IT!
                    </h2>

                    <p>
                        all the hearts matched ♡
                    </p>

                    <p>
                        finished in
                        <strong>${moves}</strong>
                        moves!
                    </p>

                    <button id="memory-again">
                        PLAY AGAIN ♡
                    </button>

                </div>
            `;

            document.getElementById("memory-again")
                .addEventListener(
                    "click",
                    startHeartMemory
                );
        }


        document.getElementById("memory-back")
            .addEventListener(
                "click",
                showGames
            );
    }


   // ============================================================
// QUIZ
// ============================================================

function startLoveQuiz() {

    const questions = [

        {
            question: "what's my favorite drink?",
            answers: [
                "Coca-Cola",
                "7UP",
                "Dr Pepper",
                "Sprite"
            ],
            correct: 1,
            multi: false
        },

        {
            question: "what's my favorite color?",
            answers: [
                "pink",
                "blue",
                "purple",
                "red"
            ],
            correct: 2,
            multi: false
        },

        {
            question: "what's my favorite season?",
            answers: [
                "spring",
                "summer",
                "autumn",
                "winter"
            ],
            correct: 3,
            multi: false
        },

        {
            question: "what are my love languages?",
            answers: [
                "physical touch",
                "words of affirmation",
                "gifts",
                "acts of service",
                "quality time"
            ],
            correct: [0, 1, 4],
            multi: true
        },

        {
            question:
                "what's my preferred method of communication?",
            answers: [
                "texting",
                "calling",
                "voice messages",
                "video calling"
            ],
            correct: 1,
            multi: false
        },

        {
            question:
                "what do i like to spend time with you doing?",
            answers: [
                "calling",
                "playing games",
                "watching things together",
                "just talking",
                "idk bro"
            ],
            correct: [0, 1, 2, 3],
            multi: true
        },

        {
            question: "what is my starsign?",
            answers: [
                "Aries",
                "Taurus",
                "Gemini",
                "Saggitarius"
            ],
            correct: 3,
            multi: false
        },

        {
            question: "whats my favourite animal?",
            answers: [
                "cat",
                "dog",
                "bird",
                "fish"
            ],
            correct: 0,
            multi: false
        },

        {
            question:
                "am i an introvert, ambivert or extrovert?",
            answers: [
                "introvert",
                "ambivert",
                "extrovert"
            ],
            correct: 1,
            multi: false
        },

        {
            question:
                "whats my favorite subject in school?",
            answers: [
                "english",
                "math",
                "science",
                "geography"
            ],
            correct: 0,
            multi: false
        }

    ];


    let current = 0;
    let score = 0;


    // ============================================================
    // RENDER QUESTION
    // ============================================================

    function renderQuestion() {

        const q = questions[current];

        if (!q) {
            showQuizResult();
            return;
        }


        computerScreen.innerHTML = `
            <div class="game-window quiz-window">

                <div class="game-header">

                    <span class="game-title">
                        💌 QUIZ
                    </span>

                    <button
                        class="game-back"
                        id="quiz-back">
                        ← GAMES
                    </button>

                </div>


                <div class="quiz-content">

                    <div class="quiz-progress">
                        QUESTION
                        ${current + 1}
                        /
                        ${questions.length}
                    </div>


                    <div class="quiz-box">

                        <div class="quiz-heart">
                            ♡
                        </div>


                        <h2>
                            ${q.question}
                        </h2>


                        ${
                            q.multi
                            ? `
                                <p class="quiz-multi-hint">
                                    choose all that apply ♡
                                </p>
                            `
                            : ""
                        }


                        <div class="quiz-answers">

                            ${q.answers.map(
                                (answer, index) => {

                                if (q.multi) {

                                    return `
                                        <label
                                            class="quiz-multi-answer">

                                            <input
                                                type="checkbox"
                                                class="quiz-checkbox"
                                                value="${index}"
                                            >

                                            <span>
                                                ${answer}
                                            </span>

                                        </label>
                                    `;
                                }


                                return `
                                    <button
                                        class="quiz-answer"
                                        data-answer="${index}">
                                        ${answer}
                                    </button>
                                `;

                            }).join("")}

                        </div>


                        ${
                            q.multi
                            ? `
                                <button
                                    id="quiz-submit"
                                    class="quiz-submit">
                                    SUBMIT ♡
                                </button>
                            `
                            : ""
                        }

                    </div>

                </div>

            </div>
        `;


        // BACK BUTTON

        document.getElementById(
            "quiz-back"
        ).addEventListener(
            "click",
            showGames
        );


        // ========================================================
        // MULTIPLE ANSWER QUESTION
        // ========================================================

        if (q.multi) {

            document.getElementById(
                "quiz-submit"
            ).addEventListener(
                "click",
                submitMultiAnswer
            );

            return;
        }


        // ========================================================
        // NORMAL QUESTION
        // ========================================================

        document.querySelectorAll(
            ".quiz-answer"
        ).forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const answer =
                        Number(
                            button.dataset.answer
                        );


                    // SCORE SILENTLY
                    if (
                        answer === q.correct
                    ) {

                        score++;

                    }


                    // Disable all answers
                    document.querySelectorAll(
                        ".quiz-answer"
                    ).forEach(btn => {
                        btn.disabled = true;
                    });


                    // NO CORRECT / WRONG
                    // COLORS OR ANSWERS ARE SHOWN


                    setTimeout(
                        nextQuestion,
                        250
                    );

                }
            );

        });

    }


    // ============================================================
    // MULTI-ANSWER QUESTION
    // ============================================================

    function submitMultiAnswer() {

        const q =
            questions[current];


        const selected =
            Array.from(
                document.querySelectorAll(
                    ".quiz-checkbox:checked"
                )
            ).map(
                input =>
                    Number(input.value)
            );


        const correctAnswers =
            [...q.correct].sort(
                (a, b) => a - b
            );


        const selectedAnswers =
            [...selected].sort(
                (a, b) => a - b
            );


        const isCorrect =
            correctAnswers.length ===
                selectedAnswers.length &&
            correctAnswers.every(
                (value, index) =>
                    value ===
                    selectedAnswers[index]
            );


        // SCORE SILENTLY

        if (isCorrect) {
            score++;
        }


        // Disable everything

        document.querySelectorAll(
            ".quiz-checkbox"
        ).forEach(
            checkbox => {
                checkbox.disabled = true;
            }
        );


        const submit =
            document.getElementById(
                "quiz-submit"
            );


        if (submit) {
            submit.disabled = true;
        }


        // NO CORRECT / WRONG
        // COLORS OR ANSWERS ARE SHOWN


        setTimeout(
            nextQuestion,
            250
        );
    }


    // ============================================================
    // NEXT QUESTION
    // ============================================================

    function nextQuestion() {

        current++;


        if (
            current >=
            questions.length
        ) {

            showQuizResult();

        } else {

            renderQuestion();

        }

    }


    // ============================================================
    // FINAL RESULT
    // ============================================================

    function showQuizResult() {

        let message;


        switch (score) {

            case 0:
                message =
                    "dude what 😭";
                break;

            case 1:
                message =
                    "so not tuff bro 😢😢";
                break;

            case 2:
                message =
                    "go study ..pls..";
                break;

            case 3:
                message =
                    "hello ?? what 😿";
                break;

            case 4:
                message =
                    "boy get ur game on";
                break;

            case 5:
                message =
                    "atleast you tried!!!";
                break;

            case 6:
                message =
                    "okayy ik u can do better than this hehe";
                break;

            case 7:
                message =
                    "good job!! lets try a bit harder hm?";
                break;

            case 8:
                message =
                    "cmonnn u can do thiiss";
                break;

            case 9:
                message =
                    "sooo close !";
                break;

            case 10:
                message =
                    "HELL YEAH!!!!!!!1";
                break;

            default:
                message =
                    "♡";
        }


        computerScreen.innerHTML = `
            <div class="game-window quiz-window">

                <div class="game-header">

                    <span class="game-title">
                        💌 QUIZ
                    </span>

                    <button
                        class="game-back"
                        id="quiz-result-back">
                        ← GAMES
                    </button>

                </div>


                <div class="game-result">

                    <div class="result-heart">
                        ${
                            score === 10
                                ? "💗"
                                : "♡"
                        }
                    </div>


                    <h2>
                        QUIZ COMPLETE!
                    </h2>


                    <p>
                        you got
                        <strong>
                            ${score}
                        </strong>
                        /
                        ${questions.length}
                    </p>


                    <p>
                        ${message}
                    </p>


                    <button id="quiz-again">
                        PLAY AGAIN ♡
                    </button>

                </div>

            </div>
        `;


        document.getElementById(
            "quiz-result-back"
        ).addEventListener(
            "click",
            showGames
        );


        document.getElementById(
            "quiz-again"
        ).addEventListener(
            "click",
            startLoveQuiz
        );

    }


    // ============================================================
    // START QUIZ
    // ============================================================

    renderQuestion();

}

    // ============================================================
    // LOVE DASH
    // ============================================================

    function startLoveDash() {

        let score = 0;
        let running = false;
        let animationFrame = null;

        let playerY = 0;
        let velocity = 0;

        let obstacles = [];
        let lastObstacle = 0;
        let startTime = 0;

        const gravity = 0.55;
        const jumpPower = 10.5;

        computerScreen.innerHTML = `
            <div class="game-window dash-window">

                <div class="game-header">

                    <span class="game-title">
                        💗 LOVE DASH
                    </span>

                    <button
                        class="game-back"
                        id="dash-back">
                        ← GAMES
                    </button>

                </div>

                <div class="dash-content">

                    <div class="dash-stats">
                        DISTANCE:
                        <b id="dash-score">0</b>
                    </div>

                    <div
                        class="dash-area"
                        id="dash-area">

                        <div
                            class="dash-player"
                            id="dash-player">
                            💗
                        </div>

                        <div class="dash-ground"></div>

                        <div
                            class="dash-start-message"
                            id="dash-message">

                            <strong>
                                LOVE DASH
                            </strong>

                            <p>
                                press SPACE or click to jump ♡
                            </p>

                            <button id="dash-start">
                                START ♡
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        `;

        const area =
            document.getElementById("dash-area");

        const player =
            document.getElementById("dash-player");

        const scoreDisplay =
            document.getElementById("dash-score");

        const message =
            document.getElementById("dash-message");


        function jump() {

            if (!running) return;

            if (playerY <= 0.5) {

                playerY = 0;
                velocity = jumpPower;
            }
        }


        function createObstacle() {

            if (!running) return;

            const obstacle =
                document.createElement("div");

            obstacle.className =
                "dash-obstacle";

            obstacle.textContent = "💔";

            const startX =
                area.clientWidth + 50;

            obstacle.style.left =
                startX + "px";

            area.appendChild(obstacle);

            obstacles.push({
                element: obstacle,
                x: startX
            });
        }


        function collision(a, b) {

            const ar =
                a.getBoundingClientRect();

            const br =
                b.getBoundingClientRect();

            const padding = 8;

            return !(
                ar.right - padding < br.left ||
                ar.left + padding > br.right ||
                ar.bottom - padding < br.top ||
                ar.top + padding > br.bottom
            );
        }


        function gameLoop(timestamp) {

            if (!running) return;

            const elapsed =
                (timestamp - startTime) / 1000;

            score =
                Math.floor(
                    elapsed * 10
                );

            scoreDisplay.textContent =
                score;

            playerY += velocity;
            velocity -= gravity;

            if (playerY <= 0) {

                playerY = 0;
                velocity = 0;
            }

            player.style.bottom =
                (playerY + 18) + "px";

            if (
                timestamp -
                lastObstacle >
                1500
            ) {

                createObstacle();

                lastObstacle =
                    timestamp;
            }

            obstacles.forEach(
                obstacle => {

                    obstacle.x -= 6;

                    obstacle.element.style.left =
                        obstacle.x + "px";
                }
            );

            obstacles =
                obstacles.filter(
                    obstacle => {

                        if (
                            obstacle.x <
                            -100
                        ) {

                            obstacle.element.remove();

                            return false;
                        }

                        return true;
                    }
                );

            for (
                const obstacle of obstacles
            ) {

                if (
                    collision(
                        player,
                        obstacle.element
                    )
                ) {

                    endDash();

                    return;
                }
            }

            animationFrame =
                requestAnimationFrame(
                    gameLoop
                );
        }


        function startDash() {

            if (running) return;

            running = true;

            score = 0;
            playerY = 0;
            velocity = 0;
            obstacles = [];

            lastObstacle =
                performance.now();

            startTime =
                performance.now();

            area.querySelectorAll(
                ".dash-obstacle"
            ).forEach(
                obstacle =>
                    obstacle.remove()
            );

            player.style.bottom =
                "18px";

            message.style.display =
                "none";

            animationFrame =
                requestAnimationFrame(
                    gameLoop
                );
        }


        function endDash() {

            running = false;

            if (animationFrame) {

                cancelAnimationFrame(
                    animationFrame
                );

                animationFrame = null;
            }

            message.style.display =
                "flex";

            message.innerHTML = `
                <strong>
                    CRASHED! 💔
                </strong>

                <p>
                    you made it
                    <strong>${score}</strong>
                    meters!
                </p>

                <button id="dash-again">
                    TRY AGAIN ♡
                </button>
            `;

            document.getElementById(
                "dash-again"
            ).addEventListener(
                "click",
                startDash
            );
        }


        document.getElementById(
            "dash-start"
        ).addEventListener(
            "click",
            event => {

                event.stopPropagation();

                startDash();
            }
        );


        area.addEventListener(
            "click",
            event => {

                if (
                    event.target.closest(
                        "#dash-start"
                    ) ||
                    event.target.closest(
                        "#dash-again"
                    )
                ) {
                    return;
                }

                if (!running) return;

                jump();
            }
        );


        function dashKeyHandler(event) {

            if (event.code !== "Space") {
                return;
            }

            event.preventDefault();

            if (!running) {
                startDash();
            } else {
                jump();
            }
        }


        document.addEventListener(
            "keydown",
            dashKeyHandler
        );


        document.getElementById(
            "dash-back"
        ).addEventListener(
            "click",
            () => {

                running = false;

                if (animationFrame) {

                    cancelAnimationFrame(
                        animationFrame
                    );

                    animationFrame = null;
                }

                document.removeEventListener(
                    "keydown",
                    dashKeyHandler
                );

                obstacles.forEach(
                    obstacle => {

                        if (
                            obstacle.element
                        ) {

                            obstacle.element.remove();
                        }

                    }
                );

                obstacles = [];

                showGames();
            }
        );
    }

// ============================================================
// CLOCK
// ============================================================

function updateClock() {
    const clock = document.getElementById("desktop-time");

    if (clock) {
        clock.textContent = new Date().toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit"
        });
    }
}


// ============================================================
// TEXT HELPERS
// ============================================================

function formatLetterText(text) {
    return escapeHTML(text)
        .replace(/\[NAME\]/gi, escapeHTML(frontingName))
        .replace(/\n\s*\n/g, "<br><br>")
        .replace(/\n/g, "<br>");
}

function escapeHTML(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function escapeAttribute(value) {
    return escapeHTML(value);
}

 // ============================================================
 // START
 // ============================================================

 /* ===== ALTERS.EXE ===== */

 const premadeAlterNames = [
    "Andrew Graves", "Armin", "Akaza", "Aoyama", "Arnie Grape",
    "Ace", "Ash Ketchum", "Arthur Morgan", "Aang", "Alfred Pennyworth",
    "Abaddon", "Alejandro", "Alex", "Ayankoji", "Aizawa",
    "Arataka Reigen", "Aquaman", "Antman", "Alvin", "Arlo", "Amy",
    "Albertsstuff", "Albert Artez", "Alastor", "Ashley Graves", "Anya",
    "Angel Devil", "Aphmau", "AppleJack", "Alfred", "Alberto", "AFO",
    "Atushi", "Allmight", "Adventurer Cookie", "Bakugo", "Bambi", "Bluey",
    "Bachira", "Bad Bunny", "Bo Burnham", "Bruce Wayne", "Batman",
    "Bruce Banner", "Ben Drowned", "Boyfriend/Bf", "Baby", "Ballora",
    "Burntrap", "Bendy", "Bonbon", "Bonnie", "Boris", "Bill", "Blitzo",
    "Bbno$", "Bear", "Butters", "Brian", "Benson Boone", "Benson", "Broly",
    "Billy Loomis", "Beast boy", "Bucky", "Birdie", "Beam", "Brooklyn T Guy",
    "Castiel", "Carter", "Chase", "Chase (the dog)", "CatNap", "Cassidy",
    "Charlie", "Charlie (Slimecicle)", "Chica", "Coraline", "Curly",
    "Chris Pratt", "Cody", "Cody Nutkiss", "Cookie King", "Colby Brock",
    "Carlos Oliveira", "Chris Redfield", "Chris", "Crankama",
    "Custard Cookie the III", "Chuuya", "Choso", "Dean Winchester",
    "Dean Withers", "DogDays", "Daisuke", "Dexter", "Douma", "Dream",
    "c!Dream", "Denji", "Dennis Whitaker", "Dabi", "Dear Santa", "Damian",
    "Dr.Murphy", "Deadpool", "Dwight", "Duncan", "Dazai",
    "Ejirou Kirishima", "Ellie", "Edd", "Eddie", "EddieVR", "Eyeless Jack",
    "Ennard", "Evan", "Eric", "Eddie Munson", "Elizabeth", "Enjin",
    "Ezekiel", "Eren Yaeger", "Freddy", "Foxy", "Fun time Foxy",
    "Fun time Freddy", "Fluttershy", "Flamingo", "Garcello", "Gaz", "Ghost",
    "Graves", "Gir", "Gojo", "Gumball", "Giyuu", "Geto", "Goku", "Gyutaro",
    "Gaara", "Hal Jordan", "Huggy", "Horangi", "Henry", "Harvey", "Harley",
    "Hannibal", "Hiro", "Higuruma", "Hobie", "Dr.House", "Harold", "Hinata",
    "Isaac", "Ilya", "Inosuke", "Iida", "Izuku", "IronMan", "IShowSpeed",
    "Inumaki", "Jax", "Jacksepticeye", "Joshdub", "Joe Goldberg",
    "Joe Graves", "John \"Price\"", "Johnny \"Soap\" Mactavish", "Jared",
    "Jensen Ackles", "Jschlatt", "Jeff The Killer", "Jeffrey", "Junior",
    "Jeffy", "Joseph", "JuicyJacob", "Juicy", "Jane", "Jynxzi",
    "Jake Webber", "Jake Paul", "Jabber", "Jecka", "Jim", "Jimmy",
    "JackManifold", "Kenny", "Ken", "König", "Keegan", "Kissy", "Kinito",
    "Kinger", "C!Karl", "Karl", "Kate", "Kai Cenat", "Kurt Krunkle",
    "Killua", "L Lawliet", "Leon Kennedy", "Lucifier", "Lolbit", "Laswell",
    "Lacey", "Laughing Jack", "Logan Paul", "Logan Thirtyacre",
    "Lance Thirtyacre", "Lucy", "Loki", "Link", "Luffy", "Levi Ackerman",
    "Monty", "Mimikyu", "Moon", "Michael Afton", "Matthew Lillard",
    "Matpat", "Markiplier", "Melanie Martinez", "Mabel", "Makarov", "Max",
    "Mully", "Morty", "Misa", "Mina", "Momo", "Momo (Creepypasta)", "Mirio",
    "Miriko", "Mario", "Marvin", "Marlon", "Makima", "Maki", "Mr.Compress",
    "Mickey Barnes", "Mark Grayson", "Mitsuri", "Muzan", "Michael Jackson",
    "Marceline", "Min-Su", "Mikasa", "Mikami Teru", "Nicole", "Nina", "N",
    "Narrator", "Near", "Nanami", "Nolan Grayson", "Nezuko", "Nick Wilde",
    "Other Wybie", "Ollie", "Ochako", "OhBabyILoveMoney", "Obito", "Puso",
    "Pico", "Pierriot", "Puppet", "Price", "Patrick Jane", "Panda",
    "Peter Parker", "Percy Jackson", "Penelope", "Prince Bubblegum",
    "Pure Vanilla Cookie", "Poison Mushroom Cookie", "Pancake Cookie",
    "Power", "Quackity", "c!Quackity", "Quinn", "Rick Sanchez", "Roxanne",
    "Rody", "Roach", "Rainbowdash", "C!Ranboo", "Ranboo", "Rintarou",
    "Rudo", "Raven", "Ray", "Ryland Grace", "Ratthew", "Rodrick",
    "Sally Face", "Shawn Mendes", "Shawn", "Shawn", "Sean", "Swansea",
    "Stan", "Slenderman", "Springtrap", "Sam Winchester", "Shigaraki Tomura",
    "Sally Williams", "Sam Williams", "Smile Dog", "Sonic.Exe",
    "Shoto Todoroki", "c!Schlatt", "SpokeIsHere", "Sam Golbach",
    "Snow Leopard", "Stu Macher", "Sanji", "Steve Rogers", "Spiderman",
    "c!Slimcicle", "Superman", "Shinobu", "Stevo Levy", "Secret Agent",
    "Sasuke", "Sukuna", "Tuv", "Ticci Toby", "Tim", "Toby", "Toy Chica",
    "Toy Freddy", "Toy Bonnie", "Tanjiro", "Tenko Shimura", "Twilight",
    "Twice", "Touya Todoroki", "Tommyinnit", "C!Tommy", "Tubbo", "c!Tubbo",
    "Todo", "Toga", "Tsuyu Asui", "Tamaki Amajiki", "Tony Stark", "Thor",
    "Tengn", "Ted", "Tota", "Tim Laflour", "Thanos", "Ushka", "Uriel",
    "Uchiha Itachi", "Uzumaki Naruto", "Uryu Ishida", "Uraraka", "Vincent",
    "Vince", "V", "Vegeta", "Wybie", "Wyborn", "William Afton", "Wemmbu",
    "Wovlerine", "Dr.Wilson", "Xavier Riddle", "Xavier", "X", "Yellow Guy",
    "yuta", "Yuuji", "Yoshida", "Zenitsu", "Zooble", "Zim", "Zelda", "Zero",
    "Zoro", "Zuko"
 ];

 let alterProfiles = JSON.parse(
    localStorage.getItem("loveExeAlters") || "[]"
 );

 let alterSearch = "";
 let alterLetter = "ALL";

 function saveAlterProfiles() {
    localStorage.setItem("loveExeAlters", JSON.stringify(alterProfiles));
 }

 function showAlters() {
    computerScreen.innerHTML = `
        <div class="alters-window">
            <div class="alters-titlebar">
                🧩 ALTERS.EXE
                <button id="alters-back">← DESKTOP</button>
            </div>
            <h1>♡ ALTER DATABASE ♡</h1>
            <p>every alter has their own little space ♡</p>
            <input id="alter-search" placeholder="search alter names...">
            <div id="alter-letters">
                ${["ALL", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"].map(letter =>
                    `<button class="alter-letter" data-letter="${letter}">${letter}</button>`
                ).join("")}
            </div>
            <button id="alter-create">＋ CREATE CUSTOM ALTER</button>
            <div id="alter-list"></div>
        </div>
    `;

    document.getElementById("alters-back").addEventListener("click", renderDesktop);

    document.getElementById("alter-search").addEventListener("input", event => {
        alterSearch = event.target.value.toLowerCase();
        renderAlterList();
    });

    document.querySelectorAll(".alter-letter").forEach(button => {
        button.addEventListener("click", () => {
            alterLetter = button.dataset.letter;
            renderAlterList();
        });
    });

    document.getElementById("alter-create").addEventListener("click", () => {
        const profile = newAlterProfile("");
        alterProfiles.push(profile);
        saveAlterProfiles();
        editAlter(profile.id);
    });

    renderAlterList();
 }

 function newAlterProfile(name) {
    return {
        id: Date.now().toString() + Math.random().toString(36).slice(2),
        name: name,
        pronouns: "",
        role: "",
        personality: "",
        likes: "",
        dislikes: "",
        hobbies: "",
        notes: "",
        image: "",
        customSections: []
    };
 }

 function renderAlterList() {
    const list = document.getElementById("alter-list");
    if (!list) return;

    const names = [...new Set(premadeAlterNames.map(name => name.trim()))];

    const all = [
        ...names.map(name => ({
            id: "premade-" + name.toLowerCase(),
            name
        })),
        ...alterProfiles
    ];

    const filtered = all.filter(alter => {
        const name = (alter.name || "").toLowerCase();
        return name.includes(alterSearch) &&
            (alterLetter === "ALL" || name.toUpperCase().startsWith(alterLetter));
    });

    list.innerHTML = filtered.map(alter => `
        <button class="alter-entry" data-alter-id="${escapeAttribute(alter.id)}">
            ♡ ${escapeHTML(alter.name || "unnamed alter")}
        </button>
    `).join("") || "<p>no alters found ♡</p>";

    list.querySelectorAll(".alter-entry").forEach(button => {
        button.addEventListener("click", () => {
            const id = button.dataset.alterId;
            let profile = alterProfiles.find(item => item.id === id);

            if (!profile) {
                const selected = filtered.find(item => item.id === id);
                if (!selected) return;

                profile = newAlterProfile(selected.name);
                alterProfiles.push(profile);
                saveAlterProfiles();
            }

            editAlter(profile.id);
        });
    });
 }

 function editAlter(id) {
    const profile = alterProfiles.find(item => item.id === id);
    if (!profile) return;

    if (!Array.isArray(profile.customSections)) {
        profile.customSections = [];
    }

    computerScreen.innerHTML = `
        <div class="alters-window alter-profile-page">
            <div class="alters-titlebar">
                🧩 ALTER PROFILE.EXE
                <button id="alter-back">← DATABASE</button>
            </div>

            <h1>♡ ${escapeHTML(profile.name || "unnamed alter")} ♡</h1>
            <p>your own little corner of the system ♡</p>

            <div class="alter-picture">
                <img alt="alter profile picture"
                    src="${profile.image || ""}"
                    style="${profile.image ? "" : "display:none"}">
                ${profile.image ? "" : "<p>no picture yet ♡</p>"}
            </div>

            <label class="alter-field">
                profile picture
                <input type="file" id="alter-image" accept="image/*">
            </label>
            <button id="alter-remove-image">REMOVE PICTURE</button>

            <div class="alter-profile-fields">
                ${[
                    ["name", "Name"],
                    ["pronouns", "Pronouns"],
                    ["role", "Role"],
                    ["personality", "Personality"],
                    ["likes", "Likes"],
                    ["dislikes", "Dislikes"],
                    ["hobbies", "Hobbies"],
                    ["notes", "Extra notes"]
                ].map(([key, label]) => `
                    <label class="alter-field">
                        ${label}
                        <textarea data-field="${key}" placeholder="write here...">${escapeHTML(profile[key] || "")}</textarea>
                    </label>
                `).join("")}
            </div>

            <hr>
            <h2>♡ MY OWN SECTIONS ♡</h2>
            <p>add anything you want! interests, favourites, memories, headcanons...</p>

            <div id="custom-sections">
                ${profile.customSections.map((section, index) => `
                    <div class="alter-custom-section">
                        <label class="alter-field">
                            section title
                            <input data-section-title="${index}"
                                value="${escapeAttribute(section.title || "")}"
                                placeholder="e.g. favourite things">
                        </label>
                        <label class="alter-field">
                            section content
                            <textarea data-section-content="${index}"
                                placeholder="write anything here...">${escapeHTML(section.content || "")}</textarea>
                        </label>
                        <button type="button" data-remove-section="${index}">REMOVE SECTION</button>
                    </div>
                `).join("")}
            </div>

            <button type="button" id="add-custom-section">＋ ADD A NEW SECTION</button>

            <div class="alter-actions">
                <button id="alter-save">SAVE PROFILE ♡</button>
                <button id="alter-delete">DELETE PROFILE</button>
            </div>
        </div>
    `;

    function collectAlterFields() {
        computerScreen.querySelectorAll("[data-field]").forEach(field => {
            profile[field.dataset.field] = field.value.trim();
        });

        computerScreen.querySelectorAll("[data-section-title]").forEach(field => {
            const index = Number(field.dataset.sectionTitle);
            if (profile.customSections[index]) {
                profile.customSections[index].title = field.value;
            }
        });

        computerScreen.querySelectorAll("[data-section-content]").forEach(field => {
            const index = Number(field.dataset.sectionContent);
            if (profile.customSections[index]) {
                profile.customSections[index].content = field.value;
            }
        });
    }

    document.getElementById("alter-back").addEventListener("click", showAlters);

    document.getElementById("add-custom-section").addEventListener("click", () => {
        collectAlterFields();
        profile.customSections.push({ title: "", content: "" });
        saveAlterProfiles();
        editAlter(id);
    });

    document.querySelectorAll("[data-remove-section]").forEach(button => {
        button.addEventListener("click", () => {
            collectAlterFields();
            profile.customSections.splice(Number(button.dataset.removeSection), 1);
            saveAlterProfiles();
            editAlter(id);
        });
    });

    document.getElementById("alter-image").addEventListener("change", event => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("please choose an image ♡");
            return;
        }

        if (file.size > 500000) {
            alert("please use an image smaller than 500 KB ♡");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            collectAlterFields();
            profile.image = reader.result;
            saveAlterProfiles();
            editAlter(id);
        };
        reader.readAsDataURL(file);
    });

    document.getElementById("alter-remove-image").addEventListener("click", () => {
        collectAlterFields();
        profile.image = "";
        saveAlterProfiles();
        editAlter(id);
    });

    document.getElementById("alter-save").addEventListener("click", () => {
        collectAlterFields();
        saveAlterProfiles();
        alert("profile saved ♡");
        showAlters();
    });

    document.getElementById("alter-delete").addEventListener("click", () => {
        if (!confirm("delete this profile?")) return;
        alterProfiles = alterProfiles.filter(item => item.id !== id);
        saveAlterProfiles();
        showAlters();
    });
 }

 showHome();

});
