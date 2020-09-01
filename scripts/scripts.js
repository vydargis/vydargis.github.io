let dico = [];

fetch('https://sheetlabs.com/CART/website_price').then(res => {
return res.json()
}).then(data => {
    dico = data;
});

const slider = document.getElementById('slider');

noUiSlider.create(slider, {
start: [0],
connect: 'lower',
keyboardSupport: true,
tooltips: [{ from: Number, to: function (value) { return (Math.round(value) === 50000 ? Math.round(value) + '+' : Math.round(value)) + ' <span class="tooltip-sub">Contacts</span>' } }],
range: {
   'min': [300, 1000],
   '1%': [1000, 1000],
   '70%': [15000, 5000],
   'max': [50000]
},
format: {
    from: function (value) {
        return Math.round(Number(value))
    },
    to: function (value) {
        return Math.round(value)
    }
}
});

const els = [
document.getElementById('slider-range-value'),
document.getElementById('price'),
document.getElementById('emails')
];


let metricOne = document.getElementById('metric-one');
let metricTwo = document.getElementById('metric-two');
let metricThree = document.getElementById('metric-three');
let support = document.getElementById('support');
let calBtn = document.getElementById('cal-btn');


let btnFormOpen = document.getElementById('btnFormOpen');


slider.noUiSlider.on('update', function (values, handle) {

els.map((item, index) => {

    let elem = {};

    for (let i = 0; i < dico.length; i++) {
        if (values[handle] > dico[i].maxi && dico[i].pricingcartsguru < 650) {
        elem = dico[i + 1]
        }
    }       

    if (elem.pricingcartsguru > 350) {
        support.innerHTML = '<p>Gestionnaire de compte dédié</p>';
    } else {
        support.innerHTML = '<p>Email et Chat Support</p>';
    }

    if (elem.pricingcartsguru < 650) {
        btnFormOpen.style.display = 'none';
    }


    // start: hubspot form

    let modalHub = document.getElementById('hubModal');        

    let btnHub = document.getElementById('hubBtn');

    let spanHub = document.getElementsByClassName('close')[0];

    let btnForm = btnHub.onclick = function() {
        modalHub.style.display = 'block';
    }

    spanHub.onclick = function() {
        modalHub.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modalHub) {
        modalHub.style.display = "none";
        } 
    }
    // end: hubspot form


    switch (index) {
        case 1:
            if (elem.pricingcartsguru === 0 || !elem.pricingcartsguru) {
                els[index].innerHTML = '<span class="pricing-title">Gratuit</span>';
                metricOne.style.display = 'flex';
                metricTwo.style.display = 'flex';
                metricThree.style.display = 'flex';
                calBtn.style.display = 'flex';

            } else if (elem.pricingcartsguru === 650) {
                els[index].innerHTML = '<div class="contact-title-container">' +
                                            "<h2 class='contact-us-class'>Pour plus d'informations sur les prix</h2>" +
                                        '</div>';
                btnFormOpen.style.display = 'block';
                metricOne.style.display = 'none';
                metricTwo.style.display = 'none';
                metricThree.style.display = 'none';
                calBtn.style.display = 'none';

            } 
            //else if (document.getElementsByClassName('wgcurrent wg-li  flag-3')[0].getAttribute('data-l') === 'fr') {
            //     els[index].innerHTML = '<span class="pricing-title">' + (Object.keys(elem).length ? elem.pricingcartsguru : '0') + '€' + '</span>' + '<span class="slider-subprice">/mois</span>'
            //     metricOne.style.display = 'flex';
            //     metricTwo.style.display = 'flex';
            //     metricThree.style.display = 'flex';
            //     calBtn.style.display = 'flex';
            // } 

            else if (elem.pricingcartsguru < 650) {
                els[index].innerHTML = '<span class="pricing-title">' + (Object.keys(elem).length ? elem.pricingcartsguru : '0') + '€' + '</span>' + '<span class="slider-subprice">/mois</span>'
                metricOne.style.display = 'flex';
                metricTwo.style.display = 'flex';
                metricThree.style.display = 'flex';
                calBtn.style.display = 'flex';
            }

            else {
                els[index].innerHTML = '<span class="pricing-title">$' + (Object.keys(elem).length ? elem.pricingcartsguru : '0') + '</span>' + '<span class="slider-subprice">/mo</span>'
                metricOne.style.display = 'flex';
                metricTwo.style.display = 'flex';
                metricThree.style.display = 'flex';
                calBtn.style.display = 'flex';
            }

        break;
            case 2:
            els[index].innerHTML = "Jusqu'à " + Math.round(values[handle] * 10) + ' <span onclick="togglePricingDetails()" class="cg-pricing-details"> Messages</span>';
        break;
            default:
            els[index].innerHTML = (values[handle] > 50001 ? 'Unlimited' : + Math.round(values[handle])) + ' Contacts'
        break;
    }
});
});


function togglePricingDetails() {
let pricingDetails = document.querySelector('#cg-pricingDetails-fr');
if (pricingDetails.style.display === "none") {
pricingDetails.style.display = "block";
} else {
pricingDetails.style.display = "none";
}
}


$('.js-example-basic-single').select2();

function calculateSMSPrice () {

    var smsCount = parseInt($('#sms-count').val(), 10) || 0;
    var $selectedCountry = $( "#sms-country option:selected" );
    var $selectedPlan = $( "#sms-plan option:selected" );
    var $resulLocation = $('.js-sms-price');
    var singleSMSPrice = 0;

    if ($('.select-sms-plan').length > 0) {
        singleSMSPrice = parseFloat($selectedCountry.data($selectedPlan.data('plan')));
    } else {
        singleSMSPrice = parseFloat($selectedCountry.data('standart'));
    }

    var finalPriceRounded = (smsCount * singleSMSPrice).toFixed(3);

    if(finalPriceRounded > 80) {
        $('.sms-price-normal').hide();
        $('.sms-price-big').show();
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

