window.addEventListener('load', () => document.querySelector('.preloader').classList.add('hidePreloader'));


window.addEventListener('scroll', () => {
    var navbar = document.querySelector('.site-navbar');
    navbar.classList.toggle('sticky', window.scrollY > 0);
})

const CreateCars = (() => {
    const cars = [];

    class Car {
        constructor(make, country, img, special, model, price, type, trans, gas) {
            this.make = make;
            this.country = country;
            this.img = img;
            this.special = special;
            this.model = model;
            this.price = price;
            this.type = type;
            this.trans = trans;
            this.gas = gas;
        }
    }

    // car creation function

    function makeCar(make, country, img = '../images/car-default.jpeg', special = true, model = 'new model', price, type = 'bmw', trans = 'automatic', gas = '50') {
        const car = new Car(make, country, img, special, model, price, type, trans, gas);
        cars.push(car);
    }

    // produce cars

    function produceCars() {
        makeCar('bmw', 'german', 'images/car-german-1.jpg', false, 'new model', '10,000', 'bmw');
        makeCar('mercedes', 'german', 'images/car-german-4.jpeg', false, 'new model', '10,000', 'benz');
        makeCar('lamborghini', 'italian', 'images/car-italian-1.jpg', false, 'new model', '10,000', 'lamborghini');
        makeCar('bmw', 'german', 'images/car-german-2.jpg', false, 'new model', '10,000', 'bmw');
        makeCar('mercedes', 'german', 'images/car-german-6.jpeg', false, 'new model', '10,000', 'benz');
        makeCar('lamborghini', 'italian', 'images/car-italian-2.jpg', false, 'new model', '10,000', 'lamborghini');
        makeCar('bmw', 'german', 'images/gallery-1.jpeg', true, 'new model', '10,000', 'bmw');
        makeCar('mercedes', 'german', 'images/gallery-2.jpg', true, 'new model', '10,000', 'benz');
        makeCar('lamborghini', 'italian', 'images/gallery-3.jpg', true, 'new model', '10,000', 'lamborghini');
        makeCar('porsche', 'german', 'images/gallery-4.jpg', true, 'new model', '10,000', 'porsche');
        makeCar('audi', 'german', 'images/gallery-5.jpeg', true, 'new model', '10,000', 'audi');
    }

    produceCars();
    // console.log(cars);

    // special cars

    const specialCars = cars.filter(car => car.special === true);
    // console.log(specialCars);

    return {
        cars,
        specialCars,
    }

})();

//console.log(CreateCars.cars);
//console.log(CreateCars.specialCars);

// display special cars

const DisplaySpecialCars = ((CreateCars) => {
    const specialCars = CreateCars.specialCars;
    // console.log(specialCars);

    const info = document.querySelector('.featured-info');

    // document loaded event

    document.addEventListener('DOMContentLoaded', () => {
        info.innerHTML = '';

        let data = '';

        specialCars.forEach(item => {
            data += `<div class="featured-item my-3 p-2 d-flex text-capitalize align-items-baseline flex-wrap">
            <span data-img="${item.img}" class="featured-icon mr-2">
                <i class="fas fa-car"></i>
            </span>
            <h5 class="font-weight-bold mx-1">${item.make}</h5>
            <h5 class="mx-1">${item.model}</h5>
        </div>`
        })
        info.innerHTML = data;
    })

    // change img

    info.addEventListener('click', (event) => {
        if (event.target.parentElement.classList.contains('featured-icon')) {
            const img = event.target.parentElement.dataset.img;
            document.querySelector('.featured-photo').src = img;
        }
    })

})(CreateCars);

// display all cars

const DisplayCars = ((CreateCars) => {
    const cars = CreateCars.cars;

    const inventory = document.querySelector('.inventory-container');

    // content loaded

    document.addEventListener('DOMContentLoaded', () => {
        inventory.innerHTML = '';

        let output = '';

        cars.forEach(car => {
            output += `<div class="col-10 mx-auto col-md-6 col-lg-4 my-3 single-car ${car.country}">
            <div class="card car-card">
                <img src="${car.img}" alt="car" class="card-img-top car-img">
                <div class="card-body">
                    <div class="car-info d-flex justify-content-between">
                        <div class="car-text text-uppercase">
                            <h6 class="font-weight-bold">${car.make}</h6>
                            <h6>${car.model}</h6>
                        </div>
                        <h5 class="car-value align-self-center py-2 px-3">
                            <span class="car-price">$ ${car.price}</span>
                        </h5>
                    </div>
                </div>
                <div class="card-footer text-capitalize d-flex justify-content-between">
                    <p><span><i class="fas fa-car"></i></span> ${car.type}</p>
                    <p><span><i class="fas fa-cogs"></i></span> ${car.trans}</p>
                    <p><span><i class="fas fa-gas-pump"></i></span> ${car.gas}</p>
                </div>
            </div>
        </div>`
        })
        inventory.innerHTML = output;
    })
})(CreateCars);

// filter cars

const filterCars = (() => {

    const filter = document.querySelectorAll('.filter-btn');

    filter.forEach(btn => {
        btn.addEventListener('click', (event) => {
            const value = event.target.dataset.filter;
            const singleCar = document.querySelectorAll('.single-car');

            singleCar.forEach(car => {
                if (value === 'all') {
                    car.style.display = 'block';
                } else {
                    (!car.classList.contains(value)) ? car.style.display = 'none': car.style.display = 'block';
                }
            })
        })
    })

})();


// lightbox appear

const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);

const images = document.querySelectorAll('.gallery-img');

images.forEach(image => {

    image.addEventListener('click', () => {

        lightbox.classList.add('active');
        const img = document.createElement('img');

        const close = document.createElement("i");
        close.classList.add('fas');
        close.classList.add('fa-times');
        close.classList.add('close');

        close.addEventListener('click', (event) => {
            if (event.target !== event.currentTarget) return;
            lightbox.classList.remove('active');
        })

        img.src = image.src;
        while (lightbox.firstChild) {
            lightbox.removeChild(lightbox.firstChild);
        }
        lightbox.appendChild(img);
        lightbox.appendChild(close);
    })

})

lightbox.addEventListener('click', (event) => {
    if (event.target !== event.currentTarget) return;
    lightbox.classList.remove('active');
})