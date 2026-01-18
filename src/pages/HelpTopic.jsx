import { Link, useParams } from 'react-router-dom';

const helpTopics = {
  order: {
    title: 'Как сделать заказ',
    sections: [
      {
        heading: 'Пошагово',
        items: [
          'Выберите товары в каталоге и откройте карточку.',
          'Нажмите “Добавить в корзину”.',
          'Перейдите в корзину и проверьте количество.',
          'Нажмите “Оформить заказ” и заполните адрес/телефон.',
          'Подтвердите заказ — статус появится в “Заказы”.',
        ],
      },
      {
        heading: 'Полезно знать',
        items: [
          'Можно оформить заказ без регистрации — но для истории заказов нужен профиль.',
          'Если цена изменилась, в корзине всегда актуальная стоимость.',
        ],
      },
    ],
  },
  payment: {
    title: 'Оплата',
    sections: [
      {
        heading: 'Способы оплаты',
        items: [
          'Банковская карта (Visa/Mastercard).',
          'Наличными курьеру при получении.',
          'Безналичный расчет для юр. лиц (по счету).',
        ],
      },
      {
        heading: 'Чеки и подтверждения',
        items: [
          'Электронный чек отправляется на e-mail.',
          'При оплате курьеру чек выдаётся на месте.',
        ],
      },
    ],
  },
  delivery: {
    title: 'Доставка',
    sections: [
      {
        heading: 'Сроки',
        items: [
          'По городу: 1–3 рабочих дня.',
          'В регионы: 3–10 рабочих дней.',
          'Сроки зависят от наличия товара на складе.',
        ],
      },
      {
        heading: 'Сборка',
        items: [
          'Сборка доступна при оформлении заказа.',
          'Стоимость сборки рассчитывается по типу мебели.',
        ],
      },
    ],
  },
  returns: {
    title: 'Возврат товаров',
    sections: [
      {
        heading: 'Условия',
        items: [
          'Возврат возможен в течение 14 дней.',
          'Товар должен быть без повреждений и следов сборки.',
          'Сохраните упаковку и чек.',
        ],
      },
      {
        heading: 'Как оформить',
        items: [
          'Свяжитесь с поддержкой и укажите номер заказа.',
          'Мы согласуем дату возврата или обмена.',
        ],
      },
    ],
  },
  contacts: {
    title: 'Контакты',
    sections: [
      {
        heading: 'Поддержка',
        items: [
          'Телефон: +996 (000) 000-000',
          'Email: support@mebelmart.kg',
          'Часы работы: Пн–Сб, 09:00–20:00',
        ],
      },
      {
        heading: 'Шоурум',
        items: [
          'Адрес: г. Бишкек, ул. Примерная, 10',
          'Визиты по предварительной записи.',
        ],
      },
    ],
  },
  security: {
    title: 'Безопасность',
    sections: [
      {
        heading: 'Как защитить аккаунт',
        items: [
          'Используйте уникальный пароль.',
          'Не сообщайте код из SMS третьим лицам.',
          'Проверяйте адрес сайта перед оплатой.',
        ],
      },
      {
        heading: 'Подозрительная активность',
        items: [
          'Если заметили странные заказы — смените пароль.',
          'Свяжитесь с поддержкой для проверки аккаунта.',
        ],
      },
    ],
  },
  compliance: {
    title: 'Горячая линия комплаенс',
    sections: [
      {
        heading: 'Что можно сообщить',
        items: [
          'Нарушения этики и конфликты интересов.',
          'Подозрения на мошенничество.',
          'Несоблюдение внутренних процедур.',
        ],
      },
      {
        heading: 'Канал связи',
        items: [
          'Email: compliance@mebelmart.kg',
          'Сообщения рассматриваются конфиденциально.',
        ],
      },
    ],
  },
};

export const HelpTopic = () => {
  const { topic } = useParams();
  const data = helpTopics[topic];

  if (!data) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Раздел не найден
          </h1>
          <Link to="/help" className="text-blue-600 dark:text-blue-400 hover:underline">
            Вернуться в помощь
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/help" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          ← Все разделы
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-3 mb-6">
          {data.title}
        </h1>
        <div className="space-y-6">
          {data.sections.map((section) => (
            <div key={section.heading} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {section.heading}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
