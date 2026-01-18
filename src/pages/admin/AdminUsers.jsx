import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminLayout } from '../../components/AdminLayout';
import { AdminUsersTable } from '../../components/AdminUsersTable';
import { SkeletonList } from '../../components/SkeletonList';
import * as usersAPI from '../../api/users';

export const AdminUsers = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await usersAPI.getAll();
      setUsers(data);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">{t('admin.users')}</h1>
      {loading ? (
        <SkeletonList count={5} />
      ) : (
        <AdminUsersTable users={users} />
      )}
    </AdminLayout>
  );
};

