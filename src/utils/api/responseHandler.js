// @ts-check
/**
 * Универсальная функция для обработки ответов от сервера
 *
 * @param {Response} response - Объект ответа от fetch
 * @returns {Promise<any>} - Данные ответа или ошибка
 */
export async function handleResponse(response) {
  // Если ответ успешный
  if (response.ok) {
    // Для ответов без тела (например, 204 No Content)
    if (response.status === 204) {
      return null;
    }

    // Для ответов с JSON
    if (response.headers.get('content-type')?.includes('application/json')) {
      return response.json();
    }

    // Для бинарных данных (например, изображения)
    if (response.headers.get('content-type')?.includes('image/')) {
      return response.blob();
    }

    // Для текстовых ответов
    return response.text();
  }

  // Обработка ошибок
  const errorData = {
    status: response.status,
    statusText: response.statusText,
    message: `Ошибка ${response.status}`,
  };

  // Пытаемся получить дополнительную информацию об ошибке из тела ответа
  try {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const jsonError = await response.json();
      errorData.data = jsonError;
      errorData.message = jsonError.message || errorData.message;
    } else {
      const textError = await response.text();
      if (textError) {
        errorData.data = textError;
        errorData.message = textError;
      }
    }
  } catch (e) {
    // Если не удалось прочитать тело ответа, оставляем стандартное сообщение
  }

  // Специальная обработка для ошибок авторизации
  if (response.status === 401) {
    errorData.message = 'Необходима авторизация';
  } else if (response.status === 403) {
    errorData.message = 'Доступ запрещен';
  }

  return Promise.reject(errorData);
}
