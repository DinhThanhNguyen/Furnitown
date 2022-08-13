$(window).on("load", function () {
  $("#pre-loading").fadeOut(1000);
});

$(document).ready(function () {
  $(".svg").svgToInline();
  changeFillter();
  validateFormContact();

  const buttonMenu = document.querySelector(".button-open__menu");
  const menuHidden = document.querySelector(".navigation");
  const hamburgerButton = document.querySelector("header .hamburger");
  const overlay = document.querySelector(".overlay");
  const body = document.body;
  const main = body.querySelector("main");

  buttonMenu.addEventListener("click", function (e) {
    e.stopPropagation();
    menuHidden.classList.add("is-open");
    overlay.classList.add("is-visible");
    body.classList.add("no-scroll");
    main.classList.add("translateX");
  });

  hamburgerButton.addEventListener("click", function (e) {
    e.stopPropagation();
    this.classList.toggle("is-active");
    menuHidden.classList.toggle("is-open");
    overlay.classList.toggle("is-visible");
    body.classList.toggle("no-scroll");
    main.classList.toggle("translateX");
  });

  document.body.addEventListener("click", function () {
    hamburgerButton.classList.remove("is-active");
    menuHidden.classList.remove("is-open");
    overlay.classList.remove("is-visible");
    body.classList.remove("no-scroll");
    main.classList.remove("translateX");
  });

  const handleScrollY = () => {
    $header = document.querySelector("header");
    if (window.scrollY > 450) {
      $header.classList.add("--fixtop");
    } else {
      $header.classList.remove("--fixtop");
    }
  };
  window.addEventListener("scroll", handleScrollY);

  function jarallax() {
    $(".jarallax").jarallax({
      speed: 0.5,
    });
  }
  jarallax();
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    anchorPlacement: "bottom",
  });

  function changePage() {
    let pageCurrent = document.querySelectorAll(".paging-number");

    pageCurrent.forEach((element) => {
      element.addEventListener("click", function () {
        document
          .querySelectorAll(".paging-number.is-active")
          .forEach((item) => {
            item.classList.remove("is-active");
          });

        this.classList.add("is-active");
      });
    });
  }
  changePage();

  function backToTop() {
    window.scrollBy({
      top: -body.offsetHeight,
      behavior: "smooth",
    });
  }
  // $("footer .back-to__top").animate({scrollTop: 0}, 1000);
  $("footer .back-to__top").on("click", backToTop);
});

//Slider Home Page
function sliderHome() {
  var $carousel = $(".slider-wapper").flickity({
    // options
    cellAlign: "left",
    contain: true,
    draggable: true,
    prevNextButtons: false,
    pageDots: false,
  });

  let $flktyPrevious = $('.button-slider .previous-button')
  let $flktyNext = $('.button-slider .next-button')

  $flktyPrevious.on( 'click', function() {
    console.log('click');
    $carousel.flickity( 'previous', true );
  });
  $flktyNext.on( 'click', function() {
    $carousel.flickity( 'next', true );
  });

  //jarallax slider on change
  var flkty = $carousel.data("flickity");
  var $imgs = $(".slider-wapper__carousel .carousel-image img");

  $carousel.on("scroll.flickity", function (event, progress) {
    flkty.slides.forEach(function (slide, i) {
      var img = $imgs[i];
      var x = ((slide.target + flkty.x) * -3) / 4;
      img.style.transform = "translateX( " + x + "px)";
    });
  });
}
sliderHome();

//Change Fillter Project Page
function changeFillter() {
  let projectPage = document.querySelector("#project");
  let fillterCurrent = document.querySelector(".filter-current");
  let fillterCurrentValue = document.querySelector(".filter-current span");
  let fillterOptionValue = document.querySelectorAll(".filter-list__item");

  if (fillterCurrent != null) {
    fillterCurrent.addEventListener("click", function (e) {
      e.stopPropagation();
      fillterCurrent.classList.toggle("is-active");
    });

    projectPage.addEventListener("click", function () {
      fillterCurrent.classList.remove("is-active");
    });
  }

  fillterOptionValue.forEach((item) => {
    item.addEventListener("click", function () {
      let optionValue = this.textContent;
      fillterCurrentValue.innerText = optionValue;
    });
  });

  if ($("#project .cart-list.featured__filter").length > 0) {
    var containerEl = document.querySelector(".featured__filter");
    mixitup(containerEl);
  }
}

function validateFormContact() {
  Validator({
    form: "#form-contact",
    formGroup: ".form-group",
    errorSelector: ".form-message",
    rules: [
      Validator.isRequired("#fullname", "Tên khách hàng không được để trống"),
      Validator.isRequired("#email", "Email không được để trống"),
      Validator.isEmail("#email", "Email is không đúng định dạng"),
      Validator.isPhoneNumber("#phone", "Số điện thoại không hợp lệ"),
      Validator.isRequired("#phone", "Không được không được để trống"),
    ],
    onSubmit: function (data) {
      //Call API
      console.log(data);
      alert("Send message success. We will contact with your nearly!");
    },
  });
}

//Slider Catalog Page
function sliderCatalogPage() {
  let catalogSlider = $(".catalog-slider").owlCarousel({
    loop: true,
    items: 3,
    dots: false,
    smartSpeed: 1200,
    autoHeight: false,
    autoplay: false,
    lazyLoad: true,
    responsive: {
      0: {
        items: 1,
      },

      600: {
        items: 2,
      },

      992: {
        items: 3,
      },
    },
  });
  $(".next-button").click(function () {
    $(this)
      .parent()
      .siblings(catalogSlider)
      .trigger("next.owl.carousel", [500]);
  });
  $(".previous-button").click(function () {
    $(this)
      .parent()
      .siblings(catalogSlider)
      .trigger("prev.owl.carousel", [500]);
  });
}
sliderCatalogPage();

//Slider Product Detail Page
function sliderProductDetailPage() {
  let productDetailSlider = $("#product-detail__main .product-image__slider");

  productDetailSlider.owlCarousel({
    loop: true,
    margin: 15,
    dots: false,
    smartSpeed: 1200,
    autoHeight: false,
    autoplay: true,
    autoplayTimeout: 3000,
    responsive: {
      0: {
        items: 3,
      },

      992: {
        items: 4,
      },
    },
  });

  $("#product-detail__main .product-image__slider img").on(
    "click",
    function () {
      var imgurl = $(this).data("imgbigurl");
      var bigImg = $(
        "#product-detail__main .gallery .owl-item.active img"
      ).attr("src");

      if (imgurl != bigImg) {
        $("#product-detail__main .gallery .owl-item.active img").attr({
          src: imgurl,
        });
      }
    }
  );
}
sliderProductDetailPage();

//List image for photoswipe
$("#product-detail__main .info-product .gallery").owlCarousel({
  loop: true,
  dots: false,
  smartSpeed: 1200,
  autoHeight: false,
  autoplay: true,
  autoplayTimeout: 3000,
  responsive: {
    0: {
      items: 1,
    },
  },
});

//Photoswipe
var initPhotoSwipeFromDOM = function (gallerySelector) {
  var parseThumbnailElements = function (el) {
    var thumbElements = el.childNodes,
      numNodes = thumbElements.length,
      items = [],
      figureEl,
      linkEl,
      size,
      item;
    for (var i = 0; i < numNodes; i++) {
      figureEl = thumbElements[i]; // <figure> element
      if (figureEl.nodeType !== 1) {
        continue;
      }
      linkEl = figureEl.children[0]; // <a> element
      size = linkEl.getAttribute("data-size").split("x");
      item = {
        src: linkEl.getAttribute("href"),
        w: parseInt(size[0], 10),
        h: parseInt(size[1], 10),
      };
      if (figureEl.children.length > 1) {
        item.title = figureEl.children[1].innerHTML;
      }
      if (linkEl.children.length > 0) {
        // <img> thumbnail element, retrieving thumbnail url
        item.msrc = linkEl.children[0].getAttribute("src");
      }
      item.el = figureEl; // save link to element for getThumbBoundsFn
      items.push(item);
    }
    return items;
  };
  var closest = function closest(el, fn) {
    return el && (fn(el) ? el : closest(el.parentNode, fn));
  };
  var onThumbnailsClick = function (e) {
    e = e || window.event;
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    var eTarget = e.target || e.srcElement;
    var clickedListItem = closest(eTarget, function (el) {
      return el.tagName && el.tagName.toUpperCase() === "FIGURE";
    });
    if (!clickedListItem) {
      return;
    }
    var clickedGallery = clickedListItem.parentNode,
      childNodes = clickedListItem.parentNode.childNodes,
      numChildNodes = childNodes.length,
      nodeIndex = 0,
      index;
    for (var i = 0; i < numChildNodes; i++) {
      if (childNodes[i].nodeType !== 1) {
        continue;
      }
      if (childNodes[i] === clickedListItem) {
        index = nodeIndex;
        break;
      }
      nodeIndex++;
    }
    if (index >= 0) {
      openPhotoSwipe(index, clickedGallery);
    }
    return false;
  };
  var photoswipeParseHash = function () {
    var hash = window.location.hash.substring(1),
      params = {};
    if (hash.length < 5) {
      return params;
    }
    var vars = hash.split("&");
    for (var i = 0; i < vars.length; i++) {
      if (!vars[i]) {
        continue;
      }
      var pair = vars[i].split("=");
      if (pair.length < 2) {
        continue;
      }
      params[pair[0]] = pair[1];
    }
    if (params.gid) {
      params.gid = parseInt(params.gid, 10);
    }
    return params;
  };
  var openPhotoSwipe = function (
    index,
    galleryElement,
    disableAnimation,
    fromURL
  ) {
    var pswpElement = document.querySelectorAll(".pswp")[0],
      gallery,
      options,
      items;
    items = parseThumbnailElements(galleryElement);
    options = {
      galleryUID: galleryElement.getAttribute("data-pswp-uid"),
      getThumbBoundsFn: function (index) {
        var thumbnail = items[index].el.getElementsByTagName("img")[0], // find thumbnail
          pageYScroll =
            window.pageYOffset || document.documentElement.scrollTop,
          rect = thumbnail.getBoundingClientRect();

        return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
      },
      showAnimationDuration: 0,
      hideAnimationDuration: 0,
    };
    if (fromURL) {
      if (options.galleryPIDs) {
        for (var j = 0; j < items.length; j++) {
          if (items[j].pid == index) {
            options.index = j;
            break;
          }
        }
      } else {
        options.index = parseInt(index, 10) - 1;
      }
    } else {
      options.index = parseInt(index, 10);
    }
    if (isNaN(options.index)) {
      return;
    }
    if (disableAnimation) {
      options.showAnimationDuration = 0;
    }
    gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  };
  var galleryElements = document.querySelectorAll(gallerySelector);
  for (var i = 0, l = galleryElements.length; i < l; i++) {
    galleryElements[i].setAttribute("data-pswp-uid", i + 1);
    galleryElements[i].onclick = onThumbnailsClick;
  }
  var hashData = photoswipeParseHash();
  if (hashData.pid && hashData.gid) {
    openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
  }
};

$(window).load(function () {
  initPhotoSwipeFromDOM(".product-image__item");
});
