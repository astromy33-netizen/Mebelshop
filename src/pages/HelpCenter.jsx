import { Link } from 'react-router-dom';

const topics = [
  { id: 'order', title: 'Как сделать заказ', desc: 'Пошаговая инструкция от выбора до оплаты.' },
  { id: 'payment', title: 'Оплата', desc: 'Доступные способы оплаты и чеки.' },
  { id: 'delivery', title: 'Доставка', desc: 'Сроки, стоимость и сборка мебели.' },
  { id: 'returns', title: 'Возврат товаров', desc: 'Условия обмена и возврата.' },
  { id: 'contacts', title: 'Контакты', desc: 'Как связаться с поддержкой.' },
  { id: 'security', title: 'Безопасность', desc: 'Как защитить аккаунт и оплату.' },
  { id: 'compliance', title: 'Горячая линия комплаенс', desc: 'Сообщить о нарушениях.' },
];

export const HelpCenter = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Помощь
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Ответы на частые вопросы и полезные инструкции.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              to={`/help/${topic.id}`}
              className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {topic.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {topic.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
