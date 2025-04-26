import { accessLvlSelectOptions, userRoleSelectOptions } from 'utils/constants';
import './AdminCreateUser.css';
import { Button, Dropdown, InputEditable, Modal } from 'components';
import { useState } from 'react';
import ModalEmail from 'components/Modal/ModalEmail/ModalEmail';
import adminApi from 'utils/api/admin';
import { useTranslation } from 'react-i18next';
import { ADMIN, COMMON } from 'utils/translationKeys';

const initialForm = {
  email: '',
  role: '',
  lvl_access: '',
};


const roleKeyMap = {
  super_admin: COMMON.ROLES.SUPER_ADMIN,
  admin: COMMON.ROLES.ADMIN,
  mentor: COMMON.ROLES.AUTHOR,
  user: COMMON.ROLES.USER,
};



export default function AdminCreateUser() {
  const { t } = useTranslation();


  const userRoleOptions = userRoleSelectOptions.map(role => ({
    label: t(roleKeyMap[role.value]),
    value: role.value,
    disabled: role.value === 'user', // или любая другая логика
  }));


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
    adminApi
      .createUser(formData)
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
            <span className="admin-create-user__sub-title">{t(ADMIN.CREATE_USER.EMAIL_INPUT_LABEL)}</span>
            <InputEditable
              type={'email'}
              value={formData.email}
              onOpen={() => setModalOpen(true)}
            />
          </label>

          <label className="admin-create-user__field">
            <span className="admin-create-user__sub-title">{t(ADMIN.CREATE_USER.ROLE_INPUT_LABEL)}</span>
            <Dropdown
              id={'role'}
              name={'user-role'}
              options={userRoleOptions}
              title={formData.role || t(ADMIN.CREATE_USER.ROLE_INPUT_PLACEHOLDER)}
              large
              onChange={changeForm}
            />
          </label>
          {formData.role === 'admin' && (
            <label className="admin-create-user__field">
              <span className="admin-create-user__sub-title">
                {t(ADMIN.CREATE_USER.ACCESS_LVL_INPUT_LABEL)}
              </span>
              <Dropdown
                id={'lvl_access'}
                name={'access-lvl'}
                options={accessLvlSelectOptions}
                title={t(ADMIN.CREATE_USER.ACCESS_LVL_INPUT_PLACEHOLDER)}
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
          {t(ADMIN.CREATE_USER.SAVE_BUTTON)}
        </Button>
        <Button
          type={'button'}
          disabled={!isFormEdited}
          onClick={() => setFormData(initialForm)}
        >
          {t(ADMIN.CREATE_USER.CANCEL_BUTTON)}
        </Button>
      </div>
      <ModalEmail
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={changeForm}
        title={t(ADMIN.CREATE_USER.MODAL_EMAIL_TITLE)}
      />
      <Modal
        isOpen={modalSuccess}
        title={t(ADMIN.CREATE_USER.MODAL_SUCCESS_TITLE)}
        onConfirm={() => setModalSuccess(false)}
      >
        <p>
          {t(ADMIN.CREATE_USER.MODAL_SUCCESS_DESCRIPTION)}
        </p>
      </Modal>
    </>
  );
}
