import { accessLvlSelectOptions, userRoleSelectOptions } from 'utils/constants';
import './AdminCreateUser.css';
import { Button, Dropdown, InputEditable, Modal } from 'components';
import { useState } from 'react';
import ModalEmail from 'components/Modal/ModalEmail/ModalEmail';
import { createUser } from 'utils/api/admin';

const initialForm = {
  email: '',
  role: '',
  lvl_access: '',
};

export default function AdminCreateUser() {
  const [formData, setFormData] = useState(initialForm);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const isFormFilled = !Object.values(formData).some((value) => !value);
  const isFormEdited = Object.values(formData).some(Boolean);

  function changeForm(name, value) {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'role') {
      const lvl_access = value === 'admin' ? '' : 1;
      setFormData((prev) => ({ ...prev, lvl_access }));
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    createUser(formData)
      .then(() => {
        setFormData(initialForm);
        setModalSuccess(true);
      })
      .catch((err) => console.warn(err));
  }

  return (
    <>
      <form
        className="admin-create-user__form"
        id="admin-create-user-form"
        onSubmit={handleSubmit}
      >
        <fieldset className="admin-create-user__fieldset">
          <label className="admin-create-user__field">
            <span className="admin-create-user__sub-title">*Email</span>
            <InputEditable
              type={'email'}
              value={formData.email}
              onOpen={() => setModalOpen(true)}
            />
          </label>

          <label className="admin-create-user__field">
            <span className="admin-create-user__sub-title">*Роль</span>
            <Dropdown
              id={'role'}
              name={'user-role'}
              options={userRoleSelectOptions}
              title={formData.role || 'Выбор'}
              large
              onChange={changeForm}
            />
          </label>
          {formData.role === 'admin' && (
            <label className="admin-create-user__field">
              <span className="admin-create-user__sub-title">
                *Уровень доступа
              </span>
              <Dropdown
                id={'lvl_access'}
                name={'access-lvl'}
                options={accessLvlSelectOptions}
                title="Выбор"
                large
                onChange={changeForm}
              />
            </label>
          )}
        </fieldset>
      </form>
      <div className="admin-create-user__buttons">
        <Button
          type={'submit'}
          relatedForm={'admin-create-user-form'}
          disabled={!isFormFilled}
        >
          Сохранить
        </Button>
        <Button
          type={'button'}
          disabled={!isFormEdited}
          onClick={() => setFormData(initialForm)}
        >
          Отменить
        </Button>
      </div>
      <ModalEmail
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={changeForm}
        title="Задать Email"
      />
      <Modal
        isOpen={modalSuccess}
        title={'Готово'}
        onConfirm={() => setModalSuccess(false)}
      >
        <p>
          Новый пользователь успешно создан. На указанную почту отправлено
          письмо с данными для авторизации.
        </p>
      </Modal>
    </>
  );
}
