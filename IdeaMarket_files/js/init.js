(function($) {

    skel.init({
        reset: 'full',
        breakpoints: {
            global: {
                href: '/css/style.css',
                containers: '75em',
                grid: {
                    gutters: ['3em', 0]
                }
            },
            xlarge: {
                media: '(max-width: 1680px)',
                href: '/css/style-xlarge.css'
            },
            large: {
                media: '(max-width: 1140px)',
                href: '/css/style-large.css',
                containers: '100%',
                grid: {
                    gutters: ['2em', 0]
                }
            },
            medium: {
                media: '(max-width: 980px)',
                href: '/css/style-medium.css',
                containers: '100%!',
                grid: {
                    zoom: 2
                }
            },
            small: {
                media: '(max-width: 736px)',
                href: '/css/style-small.css',
                grid: {
                    zoom: 3
                },
                viewport: {
                    scalable: false
                }
            },
            xsmall: {
                media: '(max-width: 480px)',
                href: '/css/style-xsmall.css',
                grid: {
                    zoom: 4
                }
            }
        }
    });

    $(function() {
        //override alert
        window.alert = function(message) {

            $('#alert-modal').toggle();
            $('#alert-text').text(message);

        }
        var $window = $(window),
            $body = $('body'),
            $header = $('#nav-bar'),
            $header_nav = $('#nav-bar nav'),
            $header_nav_ul = $('#nav-bar nav > ul'),
            id = $body.attr('id');

        ///////////////////////////////////////////////////////////////////////////

        // Temporary!
        /*if ($body.attr('id') == 'landing') {

				var $cell = $('.idea').parent(), $row = $cell.parent();
				for (var i=0; i < 5; i++)
					$cell.clone().appendTo($row);

				// Tweaks.
					$('.idea').eq(1).find('.upvote').addClass('active');
					$('.idea').eq(1).find('.progress .phase1 strong').text('100%')
					$('.idea').eq(1).find('.progress .phase2 strong').text('75%');
					$('.idea').eq(2).find('.progress .phase1 strong').text('10%')
					$('.idea').eq(3).find('.progress .phase1 strong').text('25%')
					$('.idea').eq(4).find('.progress .phase1 strong').text('100%')
					$('.idea').eq(4).find('.progress .phase2 strong').text('100%')
					$('.idea').eq(4).find('.progress .phase3 strong').text('25%')

			}*/

        ///////////////////////////////////////////////////////////////////////////

        // Disable animations/transitions until the page has loaded.
        $body.addClass('is-loading');

        $window.on('load', function() {
            window.setTimeout(function() {
                $body.removeClass('is-loading');
            }, 0);
        });

        // Touch?
        if (skel.vars.isTouch)
            $body.addClass('is-touch');

        // Forms (IE<10).
        var $form = $('form');
        if ($form.length > 0) {

            if (skel.vars.IEVersion < 10) {
                $.fn.n33_formerize = function() {
                    var _fakes = new Array(),
                        _form = $(this);
                    _form.find('input[type=text],input[type=email],textarea').each(function() {
                        var e = $(this);
                        if (e.val() == '' || e.val() == e.attr('placeholder')) {
                            e.addClass('formerize-placeholder');
                            e.val(e.attr('placeholder'));
                        }
                    }).blur(function() {
                        var e = $(this);
                        if (e.attr('name').match(/_fakeformerizefield$/)) return;
                        if (e.val() == '') {
                            e.addClass('formerize-placeholder');
                            e.val(e.attr('placeholder'));
                        }
                    }).focus(function() {
                        var e = $(this);
                        if (e.attr('name').match(/_fakeformerizefield$/)) return;
                        if (e.val() == e.attr('placeholder')) {
                            e.removeClass('formerize-placeholder');
                            e.val('');
                        }
                    });
                    _form.find('input[type=password]').each(function() {
                        var e = $(this);
                        var x = $($('<div>').append(e.clone()).remove().html().replace(/type="password"/i, 'type="text"').replace(/type=password/i, 'type=text'));
                        if (e.attr('id') != '') x.attr('id', e.attr('id') + '_fakeformerizefield');
                        if (e.attr('name') != '') x.attr('name', e.attr('name') + '_fakeformerizefield');
                        x.addClass('formerize-placeholder').val(x.attr('placeholder')).insertAfter(e);
                        if (e.val() == '') e.hide();
                        else x.hide();
                        e.blur(function(event) {
                            event.preventDefault();
                            var e = $(this);
                            var x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]');
                            if (e.val() == '') {
                                e.hide();
                                x.show();
                            }
                        });
                        x.focus(function(event) {
                            event.preventDefault();
                            var x = $(this);
                            var e = x.parent().find('input[name=' + x.attr('name').replace('_fakeformerizefield', '') + ']');
                            x.hide();
                            e.show().focus();
                        });
                        x.keypress(function(event) {
                            event.preventDefault();
                            x.val('');
                        });
                    });
                    _form.submit(function() {
                        $(this).find('input[type=text],input[type=password],textarea').each(function(event) {
                            var e = $(this);
                            if (e.attr('name').match(/_fakeformerizefield$/)) e.attr('name', '');
                            if (e.val() == e.attr('placeholder')) {
                                e.removeClass('formerize-placeholder');
                                e.val('');
                            }
                        });
                    }).bind("reset", function(event) {
                        event.preventDefault();
                        $(this).find('select').val($('option:first').val());
                        $(this).find('input,textarea').each(function() {
                            var e = $(this);
                            var x;
                            e.removeClass('formerize-placeholder');
                            switch (this.type) {
                                case 'submit':
                                case 'reset':
                                    break;
                                case 'password':
                                    e.val(e.attr('defaultValue'));
                                    x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]');
                                    if (e.val() == '') {
                                        e.hide();
                                        x.show();
                                    } else {
                                        e.show();
                                        x.hide();
                                    }
                                    break;
                                case 'checkbox':
                                case 'radio':
                                    e.attr('checked', e.attr('defaultValue'));
                                    break;
                                case 'text':
                                case 'textarea':
                                    e.val(e.attr('defaultValue'));
                                    if (e.val() == '') {
                                        e.addClass('formerize-placeholder');
                                        e.val(e.attr('placeholder'));
                                    }
                                    break;
                                default:
                                    e.val(e.attr('defaultValue'));
                                    break;
                            }
                        });
                        window.setTimeout(function() {
                            for (x in _fakes) _fakes[x].trigger('formerize_sync');
                        }, 10);
                    });
                    return _form;
                };
                $form.n33_formerize();
            }

        }

        // Mobile menu

        $('#mobile-menu').on('click', function (e) {

            e.preventDefault();

            $('#nav').slideToggle();


        });

        $(window).on('resize', function () {

            if (!$('html').hasClass('small')) {

                $('#nav').css('display', 'block');

            }

        });

        // update company profile form


        function update_company_profile(values) {

                //alert("Done!");


            $.post("/funded_company.html", $.param(values), function(data) {

                var loc = window.location;
                window.location = loc.protocol + '//' + loc.host + loc.pathname + loc.search;

            });
        }

        window.save_company_profile = function() {

            //alert("Save!");

            var team_members = [];
            $('#teammates_list').children().each(function() {
                team_members.push($(this).attr('id'));
            });


            var values = {
                "id": $('#company_id').val(),
                "company_name": $('#edit-company-name').val(),
                "company_headline": $('#edit-headline').val(),
                "company_website": $('#edit-website').val(),
                "company_twitter": $('#edit-twitter').val(),
                "company_linkedin": $('#edit-linkedin').val(),
                "company_angellist": $('#edit-angelist').val(),
                "solution": $('textarea').eq(0).val(),
                "product_description": $('textarea').eq(1).val(),
                "team_members": team_members
            };

            //alert(JSON.stringify(values));

            update_company_profile(values);

        }

        // Modal window.

         window.toggleModal = function (modal) {

                $(modal).toggle();

        }


        $("form[name=login_modal_form]").eq(1).submit(function( event )
        {

            event.preventDefault();


            $.post("http://"+window.location.host+"/login_user.html",{ "username": $('input[name=username]').eq(1).val(), "password": $('input[name=password]').eq(1).val()},function(ajaxresult)
            {
               //alert(JSON.stringify(ajaxresult));
               if(!ajaxresult.id)
               {
                    alert("Invalid email/password!");
               }
               else
               {

                    var loc = window.location;
                    window.location = loc.protocol + '//' + loc.host + loc.pathname + loc.search;
               }


            }).fail(function() {
                alert('There was an error making your request.'); // or whatever

            });


        });



        //invite friends modal
        window.add_friend = function()
        {

            //alert("hi!");
            var email = $("#follow-up input[name=email]").val();
            //alert(email);
            if(validateEmail(email))
            {
                var user_id = email.replace(/[\.@]+/g, "");
                //alert(user_id);

                var user = '<li id="'+user_id+'"><img src="/images/no-avatar.png" alt=""><a href="javascript:void()" class="name"><span class="email">'+email+'</span></a><ul class="actions"><li><a href="javascript:delete_user(\''+user_id+'\')" class="button small icon icon-close solo"><span class="label">Remove</span></a></li></ul></li>';

                $( ".users" ).append(user);
                $("#follow-up input[name=email]").val("")

                return true;

            }
            else
            {
                return false;
            }
        }


        $("form[name=invite-friends]").submit(function( event )
        {

            if(!add_friend())
            {
                alert("Invalid email!");

            }
            return false;


        });




        $('#cancel-edit-profile-button').on('click', function(e) {

            e.preventDefault();


            $('#edit-profile-button').show();
            $('#save-edit-profile-button').hide();
            $('#cancel-edit-profile-button').hide();

            $('#edit-company-details').slideToggle();

            $('.edit-field').each(function() {

                $('textarea').remove();
                $(this).show();

            });

        });



        $('#save-edit-profile-button').on('click', function(e) {

            e.preventDefault();

            save_company_profile();

        });

        // User edit fields. 
        $('#edit-profile-button').on('click', function(e) {

            e.preventDefault();


            $('#edit-profile-button').hide();
            $('#save-edit-profile-button').show();
            $('#cancel-edit-profile-button').show();


            //Populate headline 

            $('#edit-company-details').slideToggle();

            var company_name = $('.company-name').text();
            $('.edit-company-name').attr('value', company_name);

            var headline = $('.headline').text();
            $('.edit-headline').attr('value', headline);
            $('.heading-right a').each(function() {

                //Populate company profile fields.

                var socialName = $(this).attr('class').split(' ')[0];
                var socialValue = $(this).attr("href");
                $('.edit-social.' + socialName).attr('value', socialValue);

            });



            var textareas = 0;
            $('.edit-field').each(function() {

                var p = $(this).text().replace("\n", "").replace(/\s{2,}/g, " ").trim();
                $(this).after("<textarea id='textarea_" + textareas + "' class='edit' rows='7'>" + p + "</textarea>");
                $(this).hide();

                textareas++;
            });



        });

        //Side scrolling product details container.


        $('.product-images>*').each(function(index) {

            var image_count = ++index;
            if (image_count > 4) {

                $('.product-images').mouseenter(function() {

                    $('.throbber>span').addClass('active');
                    $('.product-images').on('scroll', function() {

                        $('.throbber>span').removeClass('active');


                    });

                });

                $('.product-images').mouseout(function() {

                    $('.throbber>span').removeClass('active');

                });

            }
        });

        // Add new team mate. 

        $('#add-teammate-button').on('click', function(e) {

            e.preventDefault();

            $('#add-teammate-button').hide();
            $('#save-add-teammate-button').show();
            $('#cancel-add-teammate-button').show();

            $('#new-teammate').slideToggle();

        });

        //Save add teammate

        $('#save-add-teammate-button').on('click', function(e) {

            e.preventDefault();

            save_company_profile();

        });


        $('#cancel-add-teammate-button').on('click', function(e) {

            e.preventDefault();

            $('#add-teammate-button').show();
            $('#save-add-teammate-button').hide();
            $('#cancel-add-teammate-button').hide();

            $('#new-teammate').slideToggle();

        });


        // Idea cards.
        $('article.idea')
            .css('cursor', 'pointer')
            .on('click', function(event) {
                window.location.href = $(this).find('.image').attr('href');
            })
            .find('a').on('click', function(event) {
                event.stopPropagation();
            });


        // Header dropdowns.
        var $header_nav_dropdownOpener = $header_nav.find('.dropdown-opener');

        $header_nav_dropdownOpener.each(function() {

            var $this = $(this),
                $dropdown = $this.find('.dropdown');

            $dropdown.on('click', function(e) {
                e.stopPropagation();
            });

            $this.on('click', function(e) {

                e.preventDefault();
                e.stopPropagation();

                $header_nav_dropdownOpener.not($this).removeClass('active');

                $this.toggleClass('active');

            });

        });

        $body.on('click', function() {
            $header_nav_dropdownOpener.removeClass('active');
        });

        // Progress.
        $('.progress').each(function() {

            var $progress = $(this);

            $progress.children('li').each(function() {

                var $t = $(this);
                $t.children('span').css('width', $t.children('strong').text());

            });

        });



        //subscribe
        $("#contact-form").submit(function(event) {


            event.stopPropagation();


            if ($("#contact-form input[name=newsletter_email]").val() == "") {
                return false;
            }




            send_email($("#contact-form input[name=newsletter_email]").val());




            return false;

        });



        function send_email(email)
        {


            $.post("/subscribe_to_mailchimp.html", "email=" + email, function(ajaxresult)

                {

                    //alert("ajax result:"+ajaxresult);

                    //alert("Api response: "+JSON.stringify(ajaxresult));

                    //alert("Thanks for getting in touch!");
                    toggleModal('#email-modal');

                });

        }


        // Upvote.
        $('.upvote').each(function() {

            var $upvote = $(this);

            $upvote.on('click', function(event) {



                var IdeaMarketSessionCookie = document.cookie.replace(/(?:(?:^|.*;\s*)ideamarket\s*\=\s*([^;]*).*$)|^.*$/, "$1");


                if (!IdeaMarketSessionCookie) {

                    alert("You need to login");
                } else {
                    var str = IdeaMarketSessionCookie.replace(/\\054/g, ',');

                    //str = '"{\"name\": \"geopapyrus\", \"id\": 5136918324969472, \"shortname\": \"geopapyrus\"}"';
                    //alert(str);

                    var obj = JSON.parse(eval(str))
                        //alert(obj.id);

                    var user_id = obj.id;



                    function ajaxError(jqXHR, textStatus, errorThrown) {
                        //alert("Thanks for voting!");
                    };

                    $.post("/vote_on_idea.html", 'project_id=' + $upvote.attr('id'), function(data) {
                        //console.log("voted! "+JSON.stringify(data));
                        var error = data.error;
                        //alert("vote result: "+JSON.stringify(data));

                        if (error) {
                            alert("You have already voted on this idea");
                        } else if (!data.id) {
                            alert("An error ocurred. Please try again.");

                        } else {
                            //alert("Thanks for voting!");


                            var votes = $upvote.text();
                            votes++;
                            $upvote.text(votes);
                            $upvote.toggleClass('active');

                        }

                    }, "json").fail(ajaxError);


                }

                return false;
            });

        });

        // Pages.
        switch (id) {


            case 'detail':

                var $sidebar = $('#sidebar'),
                    $content = $('#content'),
                    $header = $('#nav-bar');

                // Sidebar.
                var start, gutter, fixed = false;

                skel.on('-medium !medium', function() {

                    $window
                        .on('resize.detail', function() {

                            window.setTimeout(function() {

                                gutter = parseInt(skel.vars.state.config.grid.gutters[0].slice(0, -2)) * (skel.vars.IEVersion < 9 ? 16.5 : parseFloat(getComputedStyle($body.get(0)).fontSize));
                                start = $content.offset().top - gutter;

                                $window.trigger('scroll.detail');

                            }, 100);

                        })
                        .on('scroll.detail', function() {

                            if ($window.scrollTop() > start) {

                                if (!fixed) {

                                    $sidebar
                                        .css('width', $sidebar.outerWidth())
                                        .css('position', 'fixed');

                                    fixed = true;

                                }

                                var x = $content.offset().top + $content.outerHeight() - $window.scrollTop(),
                                    y = $sidebar.outerHeight();

                                $sidebar.css('top', Math.min(x - y, gutter));

                            } else {

                                fixed = false;

                                $sidebar
                                    .css('top', '')
                                    .css('width', '')
                                    .css('position', '');

                            }

                        })
                        .on('load.detail', function() {
                            $window.trigger('resize.detail');
                        })
                        .trigger('resize.detail');

                });

                skel.on('+medium', function() {

                    $window
                        .off('resize.detail')
                        .off('scroll.detail')
                        .off('load.detail');

                    $sidebar.css('top', 0);

                });

                break;
                // Landing.
            case 'landing':

                // Banner.
                var $banner = $('#banner');


                if ($banner.length > 0) {
                    ///
                    var IdeaMarketSessionCookie = document.cookie.replace(/(?:(?:^|.*;\s*)IdeaMarketSeen\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                    if (!IdeaMarketSessionCookie) {
                        $banner.removeClass('dismissed');
                    } else {
                        //--$('#find_idea').show();
                    }
                    ////

                    var $logo = $header.find('h1'),
                        $banner_dismiss = $banner.find('.dismiss'),
                        $banner_toggle = $('<a href="#" class="banner-toggle"><span>Property Search</span></a>');

                    // Add to nav.
                    var $li = $('<li></li>');

                    $li.prependTo($header_nav_ul);

                    $li.append($banner_toggle);

                    // Methods.
                    $banner._show = function() {

                        $banner
                            .addClass('visible')
                            .removeClass('dismissed');

                        $banner_toggle.removeClass('dismissed');

                        //--$('#find_idea').hide();

                    };

                    $banner._hide = function() {

                        $banner
                            .removeClass('visible')
                            .addClass('dismissed');

                        $banner_toggle.addClass('dismissed');

                        //--$('#find_idea').show();

                    };

                    // Move to top.
                    $banner.prependTo($body);

                    // Dismiss.
                    $banner_dismiss.on('click', function(event) {

                        document.cookie = "IdeaMarketSeen=1";

                        $banner._hide();

                        return false;

                    });

                    // Toggle.
                    if ($banner.hasClass('dismissed'))
                        $banner_toggle.addClass('dismissed');

                    $banner_toggle.on('click', function(event) {


                        if ($banner.hasClass('dismissed'))
                            $banner._show();
                        else
                            $banner._hide();

                        return false;

                    });




                }

                break;

            default:
                break;

        }

    });

})(jQuery);