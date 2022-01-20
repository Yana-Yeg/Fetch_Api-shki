import './sass/main.scss';
import fetchApiGet from './fetchApiGet';

fetchApiGet('Eagles', 'US').then(console.log);
