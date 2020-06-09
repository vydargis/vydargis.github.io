$(document).ready(function () {

    $(document).ready(function() {
        $('.js-example-basic-single').select2();
     });

    function calculateSMSPrice () {
 
        var smsCount = parseInt($('#sms-count').val(), 10) || 0;
        var $selectedCountry = $( "#sms-country option:selected" );
        var $selectedPlan = $( "#sms-plan option:selected" );
        var $resulLocation = $('.js-sms-price'); // shows pricing
        var singleSMSPrice = 0;
 
        // if user can select different plans
 
        if ($('.select-sms-plan').length > 0) {
            singleSMSPrice = parseFloat($selectedCountry.data($selectedPlan.data('plan')));
        } else {
            singleSMSPrice = parseFloat($selectedCountry.data('standart'));
        }
 
 
        var finalPriceRounded = (smsCount * singleSMSPrice).toFixed(3)
 
        if(finalPriceRounded > 99999) {
            $('.sms-price-normal').show();
            // $('.sms-price-big').show();
        } else {
            $('.sms-price-normal').show();
            $('.sms-price-big').hide();
            $resulLocation.html(finalPriceRounded);
        }
 
        $('.js-plan-name').html($selectedPlan.val());
 
    }
 
    calculateSMSPrice ();
 
    $("#sms-country, #sms-plan, #sms-count").on('change keyup', function () {
        calculateSMSPrice ();
 
        $('#sms-count').next().hide();
 
    });
 
 });
 
 
 
 






 
 
 
