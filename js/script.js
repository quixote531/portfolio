// 인트로 문자 GSAP 애니메이션
window.addEventListener('DOMContentLoaded', () => {
    const introWords = document.querySelectorAll('.intro-word h2');
    const introParagraph = document.querySelectorAll('.intro-word p');

    gsap.fromTo(introWords,
        { opacity: 0, y: 200 },
        { opacity: 1, y: 0, duration: 2, ease: 'power2.out' }
    );
    gsap.fromTo(introParagraph,
        { opacity: 0, y: 30 },  
        { opacity: 1, y: 0, duration: 2, ease: 'power2.out' }
    );
});

// 푸터 문자 GSAP 애니메이션
window.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger); // ScrollTrigger 등록

    const footerWords = document.querySelectorAll('.footer p');

    gsap.fromTo(footerWords,
        { opacity: 0 },
        {
            opacity: 1,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.footer',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        }
    );
});

// ====== NAV 클릭시 해당 섹션 스크롤 이동  ======
$(document).ready(function(){

    // 주메뉴를 클릭할 때 해당 메뉴섹션으로 스크롤
    const menu = $("header ul li")
    const contents = $(".section")

    menu.click(function(e){
        e.preventDefault();
        // 클릭된 메뉴(li)의 indexNumber 가져오기
        let idx = $(this).index()

        // 클릭된 메뉴(li)의 indexNumber와 동일순서의 section을 가져오기
        let $section = contents.eq(idx)
        let sectionPos = $section.offset().top

        // 해당섹션 위치로 이동
        $("html, body").animate({
            scrollTop: sectionPos
        },500)

    })
    // 윈도우를 스크롤할때
    $(window).scroll($.throttle(1000/10, function(){
        contents.each(function(){
            // 스크롤위치가 어떤 섹션에 해당하는지 파악
            if($(this).offset().top <=$(window).scrollTop()){
                let idx = $(this).index();
                menu.removeClass("on")
                menu.eq(idx).addClass("on")
                // menuMobile.removeClass("active")
                // menuMobile.eq(idx).addClass("active")
            }
            // console.log(`섹션 ${$(this).index()} 번 ${$(this).offset().top-114}  현재스크롤위치: ${$(window).scrollTop()}`) 
        })
    }))
})
let lenis
// ===== 부드러운 스크롤 효과 적용 (Lenis.js) =====
document.addEventListener('DOMContentLoaded', function () {
    // Lenis.js 초기화
     lenis=new Lenis ({
        duration: 1.3, //감속 지속 시간
        easing: (t) => 1 - Math.pow(1 - t,3), //부드러운 감속
        smoothWheel: true, //마우스휠에 부드러운 스크롤 적용
    })
    function updateScrollAni(time) {
        lenis.raf(time) // 부드러운 스크롤 기능 호출
        requestAnimationFrame(updateScrollAni) // 프레임전환시 다시 실행
    }
    // 화면 프레임마다 스크롤애니메이션 갱신(모니터 주사율(fps)에 최적화)
    requestAnimationFrame(updateScrollAni)  
})


// ===== 인트로 화면 호버 이미지 효과 =====

// 페이지가 완전히 로드된 후 실행
document.addEventListener('DOMContentLoaded', function () {

    // 1. 커서 이미지 박스 요소 선택
    let cursorImgBox = document.querySelector('.cursor .img-box'); // 마우스와 함께 이동할 이미지 박스
    let cursorLinks = document.querySelectorAll("#intro .intro-row"); // 특정 링크들 선택

    // 2. 마우스 이동 시 커서 이미지 박스 따라가기
    document.addEventListener('mousemove', (e) => {
        // 마우스의 위치에 따라 `cursorImgBox` 이동
        cursorImgBox.style.top = `${e.clientY}px`;
        cursorImgBox.style.left = `${e.clientX}px`;

        // 부드러운 애니메이션 효과 추가 (2초 동안 이동)
        cursorImgBox.animate({
            top: `${e.clientY}px`,
            left: `${e.clientX}px`
        }, { duration: 2000, fill: "forwards" });

    });

    // 3. 특정 링크 위에 마우스를 올리면 해당 이미지 표시
    cursorLinks.forEach(item => {
        let imageUrl = item.getAttribute('data-img'); // `data-img` 속성 값 가져오기
        let cursorImg = document.querySelector(imageUrl); // 해당 `data-img`에 해당하는 이미지 요소 찾기

        // 예외 처리: `querySelector`가 null을 반환할 경우 방지
        if (!cursorImg) return;

        // 마우스를 올리면 이미지 표시
        item.addEventListener('mouseover', () => {
            cursorImgBox.classList.add('on'); // 커서 이미지 박스 활성화
            cursorImg.classList.add('on'); // 해당 이미지 활성화
        });

        // 마우스를 떼면 이미지 숨기기
        item.addEventListener('mouseout', () => {
            cursorImgBox.classList.remove('on'); // 커서 이미지 박스 비활성화
            cursorImg.classList.remove('on'); // 해당 이미지 비활성화
        });
    });

});

// ====== 웹퍼블리싱 섹션 ======

// 웹퍼블리싱 섹션 - GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 비디오 autoplay 속성을 동적으로 추가/제거
function handleVideoAutoplay(video, triggerElement) {
    ScrollTrigger.create({
        trigger: triggerElement,
        start: "top 30%",
        end: "bottom 30%",
        toggleActions: "play reverse play reverse",
        onEnter: () => {
          if (window.innerWidth >= 480) {
            video.setAttribute("autoplay", "true");
            video.muted = true;
            video.play();
          }
        },
        onLeave: () => {
          video.removeAttribute("autoplay");
          video.pause();
          video.currentTime = 0;
        },
        onEnterBack: () => {
          if (window.innerWidth >= 480) {
            video.setAttribute("autoplay", "true");
            video.muted = true;
            video.play();
          }
        },
        onLeaveBack: () => {
          video.removeAttribute("autoplay");
          video.pause();
        }
      });
}
  
  // 모든 .web-work 요소에 대해 비디오 컨트롤 적용
  document.querySelectorAll(".web-work").forEach((work) => {
    const video = work.querySelector("video");
    if (video) {
      handleVideoAutoplay(video, work);
    }
  });

ScrollTrigger.create({
    trigger: "#work .contents-area",
    start: "top top",
    end: "bottom bottom",
    pin: "#work .order-num",
    anticipatePin: 1,
    // markers: true,
});

function removeAutoplayForSmallScreens() {
    if (window.innerWidth < 480) {
        document.querySelectorAll("video").forEach((video) => {
            video.removeAttribute("autoplay");
            video.pause();
        });
       // video를 클릭하면 재생하도록 이벤트 추가
        video.addEventListener("click", function playOnClick() {
            if (video.paused) {
            video.play();
            }
        });
    }
}
  
window.addEventListener("DOMContentLoaded", removeAutoplayForSmallScreens);
window.addEventListener("resize", removeAutoplayForSmallScreens);

// 각각의 .web-work 스크롤 진입 시 .num-count의 숫자 변경
const webWorks = document.querySelectorAll("#work .scroll-area .web-work");

webWorks.forEach((work, index) => {
  ScrollTrigger.create({
    trigger: work,
    start: "top 20%", // 웹 작업물의 상단이 화면의 상단 20% 지점에 도달하면 애니메이션 시작
    end: "bottom center", // 웹 작업물의 하단이 화면의 중앙을 통과하면 애니메이션 종료
    toggleActions: "play reverse play reverse", // 스크롤 방향에 따라 애니메이션 재생 및 역재생 반복
    // markers: true,
    onEnter: () => updateNum(index), //요소 화면 진입시 인덱스 업데이트
    onEnterBack: () => updateNum(index) //요소 화면 진입시 인덱스 업데이트
  });
});

// 숫자 변경 함수 정의(index에 따라 숫자를 y축으로 이동)
function updateNum(index) {
  gsap.to("#work .order-num .num-count", {
    yPercent: -100 * index, // 숫자의 높이만큼 이동하여 다음 숫자로 전환
    ease: "power2.out", // 부드러운 전환 효과
    duration: 0.5 // 애니메이션 지속 시간 (0.5초)
  });
}


// ====== 디자인 섹션 ======
// 아코디언 메뉴 클릭시 펼치기 기능 설정
$(document).ready(function(){
    const designList = $('#design li')

    // 최초 실행 시 첫 번째 li만 active하고
    designList.first().addClass('active');

    designList.click(function(e){
        e.preventDefault();

        if (window.innerWidth <= 990) {
            // 990px 이하일 때 슬라이드 방식
            if (!$(this).hasClass('active')) {
                designList.removeClass('active').find('.content').slideUp();
                $(this).addClass('active').find('.content').slideDown();
            } else {
                $(this).removeClass('active').find('.content').slideUp();
            }
        } else {
            // 990px 초과일 때는 슬라이드 없이 active만 처리
            designList.removeClass('active');
            $(this).addClass('active');
        }
    });

})


// ====== 모달창======
$(document).ready(function(){
    const modalContents = {
        'findoc': {
          img: 'images/findoc_process_wrap.jpg',
        },
        'genie': {
          img: 'images/genie-process.png',
        },
        'banner1': {
          img: 'images/준비중.png',
        },
        'banner2': {
          img: 'images/준비중.png',
        },
        'logo': {
          img: 'images/logo-process.png',
        },
        'd_page': {
          img: 'images/준비중.png',
        },
    };

    // 모달창 띄우기
    $('.more-btn').click(function(e){
        e.preventDefault();
        const id = $(this).data('id'); // 버튼에서 data-id 가져오기
        const content = modalContents[id];

        if (content) {
            $('.modal img').attr('src', content.img); // 이미지 변경
        } else {
            console.warn(`"${id}"에 해당하는 콘텐츠가 없습니다.`);
        }

        lenis.stop()
        $('.modal').fadeIn();
        $('.modal-close-btn').fadeIn();
        $('.mask').fadeIn();
        // $('html, body').css("overflow","hidden");
    });
    // 모달창 스크롤 이벤트 부모로 전파 막기
    $('.modal').on('wheel touchmove',function(e){
      e.stopPropagation();
    })
    // 모달창 닫기
    $('.modal-close-btn, .mask').click(function(e){
        e.preventDefault();
        lenis.start()
        $('.modal').stop().scrollTop(0); //스크롤 처음으로
        $('.modal').fadeOut();
        $('.modal-close-btn').fadeOut();
        $('.mask').fadeOut();
        // $('html, body').css("overflow", "visible");
    });
});

