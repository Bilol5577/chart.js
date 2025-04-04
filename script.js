async function fetchData() {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    return data.products;
}

async function createCharts() {
    const products = await fetchData();

    // 1. Цена товаров
    const productNames = products.map(product => product.title);
    const productPrices = products.map(product => product.price);

    // 2. Категории товаров
    const productCategories = products.map(product => product.category);

    // 3. Бренды товаров
    const productBrands = products.map(product => product.brand);

    // 4. Скидки товаров
    const productDiscounts = products.map(product => product.discountPercentage);

    // 5. Рейтинг товаров
    const productRatings = products.map(product => product.rating);

    // 6. Средняя цена
    const totalPrice = productPrices.reduce((sum, price) => sum + price, 0);
    const averagePrice = totalPrice / productPrices.length;

    // 7. Самая дорогая и самая дешёвая цена
    const maxPrice = Math.max(...productPrices);
    const minPrice = Math.min(...productPrices);

    // Chart 1: Бар-график для цен
    const priceCtx = document.getElementById('priceChart').getContext('2d');
    new Chart(priceCtx, {
        type: 'bar',
        data: {
            labels: productNames,
            datasets: [{
                label: 'Price in USD',
                data: productPrices,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Chart 2: Пироговый график для категорий
    const categoryCount = productCategories.reduce((acc, category) => {
        acc[category] = (acc[category] || 0) + 1;
        return acc;
    }, {});
    const categoryNames = Object.keys(categoryCount);
    const categoryValues = Object.values(categoryCount);
    const categoryCtx = document.getElementById('categoryChart').getContext('2d');
    new Chart(categoryCtx, {
        type: 'pie',
        data: {
            labels: categoryNames,
            datasets: [{
                label: 'Product Categories',
                data: categoryValues,
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });

    // Chart 3: Гистограмма для брендов
    const brandCount = productBrands.reduce((acc, brand) => {
        acc[brand] = (acc[brand] || 0) + 1;
        return acc;
    }, {});
    const brandNames = Object.keys(brandCount);
    const brandValues = Object.values(brandCount);
    const brandCtx = document.getElementById('brandChart').getContext('2d');
    new Chart(brandCtx, {
        type: 'bar',
        data: {
            labels: brandNames,
            datasets: [{
                label: 'Brand Count',
                data: brandValues,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Chart 4: График для скидок
    const discountCtx = document.getElementById('discountChart').getContext('2d');
    new Chart(discountCtx, {
        type: 'line',
        data: {
            labels: productNames,
            datasets: [{
                label: 'Discount Percentage',
                data: productDiscounts,
                borderColor: 'rgba(255, 159, 64, 1)',
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Chart 5: График для рейтингов
    const ratingCtx = document.getElementById('ratingChart').getContext('2d');
    new Chart(ratingCtx, {
        type: 'bar',
        data: {
            labels: productNames,
            datasets: [{
                label: 'Rating',
                data: productRatings,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Chart 6: Средняя цена товаров
    const averagePriceCtx = document.getElementById('averagePriceChart').getContext('2d');
    new Chart(averagePriceCtx, {
        type: 'doughnut',
        data: {
            labels: ['Average Price'],
            datasets: [{
                label: 'Average Price in USD',
                data: [averagePrice],
                backgroundColor: ['rgba(75, 192, 192, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });
}

createCharts();