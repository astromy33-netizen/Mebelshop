import { useTranslation } from 'react-i18next';

export const AdminUsersTable = ({ users }) => {
  const { t } = useTranslation();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-[640px] w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="px-4 py-3 text-left text-gray-900 dark:text-white">ID</th>
            <th className="px-4 py-3 text-left text-gray-900 dark:text-white">Full Name</th>
            <th className="px-4 py-3 text-left text-gray-900 dark:text-white">Email</th>
            <th className="px-4 py-3 text-left text-gray-900 dark:text-white">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{user.id}</td>
              <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{user.fullName}</td>
              <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{user.email}</td>
              <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                <span className={`px-2 py-1 rounded text-sm ${
                  user.role === 'admin' 
                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                }`}>
                  {user.role}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

