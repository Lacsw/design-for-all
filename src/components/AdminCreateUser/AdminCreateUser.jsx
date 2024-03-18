import { accessLvlSelectOptions, userRoleSelectOptions } from 'utils/constants';
import './AdminCreateUser.css';
import { Button, Dropdown, InputEditable } from 'components';

export default function AdminCreateUser() {
  return (
    <section className="admin-create-user">
      <div className="admin-create-user__container">
        <form className="admin-create-user__form" id="admin-create-user-form">
          <fieldset className="admin-create-user__fieldset">
            <label className="admin-create-user__field">
              <span className="admin-create-user__sub-title">*Email</span>
              <InputEditable type={'text'} value={'example@domain.com'} />
            </label>

            <label className="admin-create-user__field">
              <span className="admin-create-user__sub-title">*Роль</span>
              <Dropdown
                id={'user-role'}
                name={'user-role'}
                options={userRoleSelectOptions}
                title="Выбор"
                large
              />
            </label>

            <label className="admin-create-user__field">
              <span className="admin-create-user__sub-title">
                *Уровень доступа
              </span>
              <Dropdown
                id={'access-lvl'}
                name={'access-lvl'}
                options={accessLvlSelectOptions}
                title="Выбор"
                large
              />
            </label>
          </fieldset>
        </form>
        <div className="admin-create-user__buttons">
          <Button type={'submit'} relatedForm={'admin-create-user-form'}>
            Сохранить
          </Button>
          <Button type={'submit'}>Отменить</Button>
        </div>
      </div>
    </section>
  );
}
