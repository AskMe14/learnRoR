jQuery(document).ready(function($) {
     const $select = $('#selector'),
           $form = $('#main-form'),
           $inner = $('.main-inner');

     const URL = 'https://frontend-test-api.alex93.now.sh/api/languages';

    $select.formSelect();

    $form.on('submit', submitCallback);
    
    function submitCallback(e) {
        let group = $select.val(),
            domCount = $inner.find('.content-box').length;

        e.preventDefault();

        // удаление предыдущих элементов
        (domCount > 0) ? $inner.empty() : '';
        // гет запрос
        group ? $.get(URL, {group}, onSuccess, 'json') : alert('Выберите направление');
    }

    function onSuccess(res) {
        let data = res.data;
        data.forEach(item => {
            console.log(item);
            item.logo ? addBox(item.name, item.logo, item.docs, item.year, item.projectsCount) : '';
        });
    }

    function addBox(name, logo, docs, year, projectsCount) {
        let contentBox = document.createElement('div');
        contentBox.classList.add('content-box');

        let image = document.createElement('div');
        image.classList.add('content-image');

        let desc = document.createElement('div');
        desc.classList.add('content-desc');

        $(image).append('<img src="'+ logo +'" alt="">');
        $(desc).append('<div class="content-title">'+ name +'</div>');
        $(desc).append('<div class="content-date"> Основан в '+ year +'</div>');
        $(desc).append('<div class="content-projects">'+ projectsCount +' проектов на GitHub</div>');
        $(desc).append('<a href="'+ docs +'" class="docs" target="_blank">Документация</a>');

        contentBox.append(image);
        contentBox.append(desc);
        $inner.append(contentBox);
    }
});