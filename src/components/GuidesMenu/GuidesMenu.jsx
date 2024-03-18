import './GuidesMenu.css';

export default function GuidesMenu() {
  return (
    <div className="guides-menu">
      <div className="guides-menu__header">
        <h2 className="guides-menu__title">Руководства</h2>
        <button className="guides-menu__search-button"></button>
      </div>
      <ul className="guides-menu__guides-list">
        <li className="guides-menu__guide">Руководство по написанию статей</li>
        <li className="guides-menu__guide">Руководство по SEO для статей</li>
        <li className="guides-menu__guide">Пользовательское соглашение</li>
        <li className="guides-menu__guide">Политика конфиденциальности</li>
      </ul>
    </div>
  );
}
