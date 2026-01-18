// Скрипт для добавления товаров в MockAPI
// Вставь сюда массив товаров от ChatGPT

const products = [
  // ВСТАВЬ СЮДА JSON МАССИВ ОТ CHATGPT
  // Пример:
  // {
  //   "titleKg": "Угловой диван",
  //   "titleRu": "Угловой диван",
  //   "titleEn": "Corner Sofa",
  //   ...
  // }
];

const API_URL = 'https://6968854769178471522ab887.mockapi.io/products';

// Функция для добавления всех товаров
async function addAllProducts() {
  if (products.length === 0) {
    console.log('❌ Массив товаров пуст! Вставь товары от ChatGPT в переменную products');
    return;
  }

  console.log(`🚀 Начинаю добавление ${products.length} товаров...\n`);

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
      });
      
      if (response.ok) {
        const data = await response.json();
        successCount++;
        console.log(`✅ [${i + 1}/${products.length}] Добавлен: ${data.titleRu || data.titleEn}`);
      } else {
        errorCount++;
        const errorText = await response.text();
        console.error(`❌ [${i + 1}/${products.length}] Ошибка для "${product.titleRu || product.titleEn}": ${errorText}`);
      }
      
      // Задержка между запросами (чтобы не перегрузить API)
      if (i < products.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } catch (error) {
      errorCount++;
      console.error(`❌ [${i + 1}/${products.length}] Ошибка: ${error.message}`);
    }
  }

  console.log(`\n🎉 Готово!`);
  console.log(`✅ Успешно добавлено: ${successCount}`);
  console.log(`❌ Ошибок: ${errorCount}`);
}

// Запусти функцию
addAllProducts();
