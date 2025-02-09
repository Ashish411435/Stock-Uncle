(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Fixed Navbar
    $(document).ready(function () {
        function applyScrollEffect() {
            if ($(window).width() < 992) {
                if ($(window).scrollTop() > 45) {
                    $('.fixed-top').addClass('bg-white shadow');
                } else {
                    $('.fixed-top').removeClass('bg-white shadow');
                }
            } else {
                if ($(window).scrollTop() > 45) {
                    $('.fixed-top').addClass('bg-white shadow').css('top', -45);
                } else {
                    $('.fixed-top').removeClass('bg-white shadow').css('top', 0);
                }
            }
        }
    
        // Run the function immediately when the page loads
        setTimeout(() => { 
            applyScrollEffect();
        }, 300);
    
        // Also run the function on scroll
        $(window).scroll(function () {
            applyScrollEffect();
        });
    });
    


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Project carousel
    $(".project-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });

    $("#contactForm").validate({
        errorElement: "div",
        rules: {
            fullname: {
                required: true,
                maxlength: 45,
                minlength: 3,
            },
            email: {
                required: true,
                maxlength: 50,
                minlength: 5,
            },
            mobile: {
                required: true,
                minlength: 10,
                maxlength: 10,
                digits: true,
            },
            subject: {
                required: true,
                maxlength: 80,
            },
            message: {
                required: true,
                maxlength: 400,
                minlength: 10,
            },
        },
        messages: {
            mobile: {
                required: "Mobile number is required",
                minlength: "Mobile number must be exactly 10 digits",
                maxlength: "Mobile number must be exactly 10 digits",
                digits: "Only numbers are allowed"
            }
        }
    });

    // $("#contactForm").on("submit", function(e){
    //     e.preventDefault();
    //     if($(this).valid()){
    //         let submitBtn = $("#submitBtn");
    //         let formData = $(this).serialize();
    //         console.log(formData);
    //         // return;
    //         $.ajax({
    //             url: "./contact.php",
    //             type: "POST",
    //             data: formData,
    //             beforeSend: function(){
    //                 $(submitBtn).prop("disabled", true);
    //                 $(submitBtn).append(`<span class="spinner-border text-light ms-2" role="status"></span>`);
    //             },
    //             success: function(response){
    //                 $(submitBtn).prop("disabled", false);
    //                 $(submitBtn).find(".spinner-border").remove();
    //                 console.log("res", response);

    //             },
    //             error: function(){
    //                 alert('Something went wrong...');
    //             }
    //         });
    //     }
    // });

    $(document).ready(() => {
        $(document).on("submit", "#contactForm", function (e) {
            e.preventDefault();
            if (!$(this).valid()) return;
            const submitBtn = $("#submitBtn");
            const submissionPath = $(this).is("[data-book-trial]") ? "../contact.php" : "./contact.php";
            const formData = $(this).serialize();
            toggleButton(submitBtn, true);

            $.post(submissionPath, formData)
                .done((response) => {
                    console.log("Response:", response);
                    $("#contactForm")[0].reset();
                    $(".submission-message-wrapper")
                    .text("Your message has been sent successfully!")
                    .removeClass("error-bg fade")
                    .addClass("success-bg");
                    // $("#contactForm")[0].reset(); // Reset form
                })
                .fail((err) => {
                    console.error("Error:", err);

                    const errorMessage = err.responseText || "Something went wrong. Please try again.";
                    $(".submission-message-wrapper")
                        .text(errorMessage)
                        .removeClass("success-bg fade")
                        .addClass("error-bg");
                })
                .always(() => toggleButton(submitBtn, false));
        });

        function toggleButton(btn, disable) {
            btn.prop("disabled", disable);
            if (disable) {
                btn.append(`<span class="spinner-border text-light ms-2" role="status"></span>`);
            } else {
                btn.find(".spinner-border").remove();
            }

            // Reset message before new submission
            setTimeout(() => { 
                $(".submission-message-wrapper").text("").removeClass("success-bg error-bg").addClass("fade");
            }, 15000);
        }
    });




})(jQuery);

