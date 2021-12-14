// eslint-disable-next-line linebreak-style
document.addEventListener("DOMContentLoaded", () => {

    let arr_student = [];
    let date = new Date();
    let currentYear = date.getFullYear();


    /*Кнопка Добавить */
    document.getElementById("addstudent").addEventListener('click', () => {
        document.querySelector(".students__new-student").classList.toggle('hide');
    });

    document.getElementById('add').addEventListener("click", () => {

        let name = document.getElementById('name').value.trim();
        let secondname = document.getElementById('secondname').value.trim();
        let patronymic = document.getElementById('patronymic').value.trim();
        let birth = new Date(document.getElementById('birth').value);
        let yearstart = Number(document.getElementById('year-start').value);
        let facultet = document.getElementById('facultet').value.trim();

        /*validation form */
        //alert(`${name}` || ` ${secondname}` || ` ${patronymic}` || ` ${birth}` || ` ${toString(yearstart)}` || ` ${facultet}`);


        const errslist = document.querySelector('.err');
        let err = 0;
        let errtext = '';


        if (!name) {
            err = 1;
            errtext = errtext + 'Необходимо заполнить поле Имя';
            errslist.innerText = errtext;
        };
        if (!secondname) {
            err = 1;
            errtext = errtext + 'Необходимо заполнить поле Фамилия'
            errslist.innerText = errtext;
        };
        if (!patronymic) {
            err = 1;
            errtext = errtext + 'Необходимо заполнить поле Отчество';
            errslist.innerText = errtext;
        };

        if (!birth) {
            err = 1;
            errtext = errtext + 'Необходимо заполнить поле Дата рождения';
            errslist.innerText = errtext;
        };
        if (!yearstart) {
            err = 1;
            errtext = errtext + 'Необходимо заполнить поле Год начала обучения';
            errslist.innerText = errtext;

        };

        if (!facultet) {
            err = 1;
            errtext = errtext + 'Необходимо заполнить поле Факультет';
            errslist.innerText = errtext;

        };


        if (Number(yearstart) <= 2000 || Number(yearstart) >= Number(currentYear)) {
            err = 1;
            errslist.innerHTML = 'Год начала обучения должен быть в пределах от 2000 до текущего года';
        }

        if (birth < Date.parse('1900-01-01') || birth.getFullYear() > currentYear) {
            err = 1;
            errslist.innerHTML = 'Дата рождения должна быть в пределах от 01.01.1900 до текущего дня';

        }

        if (err === 0) {

            errslist.innerText = '';
            /*пишем вмассив */
            let obj = { 'secondname': secondname, 'name': name, 'patronymic': patronymic, 'facultet': facultet, 'datebirth': birth, 'yearstart': yearstart }
            arr_student.splice(-1, 0, obj);
            /* */




            paintTable(arr_student);
            clearform();
            document.querySelector(".students__new-student").classList.add('hide');
        }


    });

    function paintTable(arr) {
        let node = document.querySelectorAll('.students__students-item');
        node.forEach(function(item) {
            if (item) {

                item.parentNode.removeChild(item);

            };
        });


        arr.forEach(function(item) {

            let fio = `${item['secondname']} ${item['name']} ${item['patronymic']}`;

            let datebirth = formatDate(item['datebirth']);
            let birthyear = item['datebirth'].getFullYear();
            let currentMonth = date.getMonth();
            let dateEdu;
            let kyrs = currentYear - item['yearstart'];
            if ((currentMonth < 9 && kyrs == 4) || kyrs > 4) {
                dateEdu = item['yearstart'] + '-' + (item['yearstart'] + 4) + ' (закончил)';
            } else {
                dateEdu = item['yearstart'] + '-' + currentYear + '(' + (currentYear - item['yearstart']) + ' курс )';
            };

            let studentEl = document.createElement('tr');

            studentEl.classList.add('students__students-item');
            let fioEl = document.createElement('td');
            let facultetEl = document.createElement('td');
            let datebirthEl = document.createElement('td');
            let dateEduEl = document.createElement('td');
            let age = declOfNum(birthDateToAge(item['datebirth']), ['год', 'года', 'лет']);


            let td = document.querySelector('.table__body');
            console.log(td);

            td.appendChild(studentEl);


            fioEl.innerText = fio;
            facultetEl.innerText = item['facultet'];
            datebirthEl.innerText = `${datebirth} (${age})`;
            dateEduEl.innerText = dateEdu;


            studentEl.appendChild(fioEl);
            studentEl.appendChild(facultetEl);
            studentEl.appendChild(datebirthEl);
            studentEl.appendChild(dateEduEl);

        });





    }

    function clearform() {
        document.getElementById('name').value = "";
        document.getElementById('secondname').value = ""
        document.getElementById('patronymic').value = "";
        document.getElementById('birth').value = "";
        document.getElementById('year-start').value = "";
        document.getElementById('facultet').value = "";

        /*очистить поля ввода */
    }

    function declOfNum(number, titles) {
        cases = [2, 0, 1, 1, 1, 2];
        return number + " " + titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }

    function birthDateToAge(b) {

        var n = new Date(),
            bn = new Date(b),
            age = n.getFullYear() - bn.getFullYear(),

            yy = n.getFullYear(yy);

        return n < bn.setFullYear(yy) ? age - 1 : age;
    }

    function formatDate(date) {

        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        var yy = date.getFullYear();


        return dd + '.' + mm + '.' + yy;
    };
    // document.write( declOfNum(birthDateToAge("1880-07-15"), ['год', 'года', 'лет']) );
    /** */

    document.getElementById('sortfio').addEventListener('click', () => {
        let sortarr = arr_student;
        sortarr.sort((prev, next) => {
            let fio1 = prev.secondname + ' ' + prev.name + ' ' + prev.patronymic;
            let fio2 = next.secondname + ' ' + next.name + ' ' + next.patronymic;

            if (fio1 < fio2) return -1;
            if (fio1 > fio2) return 1;
        });
        paintTable(sortarr);
    });

    document.getElementById('sortfacul').addEventListener('click', () => {
        let sortarr = arr_student;
        sortarr.sort((prev, next) => {
            if (prev.facultet < next.facultet) return -1;
            if (prev.facultet > next.facultet) return 1;
        });
        paintTable(sortarr);
    });
    document.getElementById('sortbirth').addEventListener('click', () => {
        let sortarr = arr_student;
        sortarr.sort((prev, next) => prev.datebirth - next.datebirth);
        paintTable(sortarr);
    });
    document.getElementById('sortedu').addEventListener('click', () => {
        let sortarr = arr_student;
        sortarr.sort((prev, next) => prev.yearstart - next.yearstart);
        paintTable(sortarr);
    });
    //фильтр по всем полям
    document.querySelectorAll('.filter').forEach(function(item) {
        item.addEventListener('input', (el) => {
            let fsecondname = document.getElementById('filtersecondname').value;
            let fname = document.getElementById('filtername').value;
            let fpatronimic = document.getElementById('filterpatronymic').value;
            let ffacultet = document.getElementById('filterfacultet').value;
            let fyearstart = document.getElementById('filteryearstart').value;
            let fyearend = document.getElementById('filteryearend').value;

            let filterArr = arr_student.filter(function(item) {

                return (item.secondname.toUpperCase().indexOf(fsecondname.toUpperCase()) >= 0 || fsecondname == '') &&
                    (item.name.toUpperCase().indexOf(fname.toUpperCase()) >= 0 || fsecondname == '') &&
                    (item.patronymic.toUpperCase().indexOf(fpatronimic.toUpperCase()) >= 0 || fpatronimic == '') &&
                    (item.facultet.toUpperCase().indexOf(ffacultet.toUpperCase()) >= 0 || ffacultet == '') &&
                    (item.yearstart === Number(fyearstart) || fyearstart == '') &&
                    (item.yearstart + 4 === Number(fyearend) || fyearend == '');
            });
        })




    });

    //фильтр по факультету
    document.getElementById('filterfacultet').addEventListener('input', (el) => {

        let filterArr = arr_student.filter(function(item) {

            return item.facultet.toUpperCase().indexOf(el.currentTarget.value.toUpperCase()) >= 0;
        });
        paintTable(filterArr);

    });

    //фильтр по году начала обучения

    document.getElementById('filteryearstart').addEventListener('input', (el) => {

        let filterArr = arr_student.filter(function(item) {

            return parseInt(item.yearstart) == parseInt(el.currentTarget.value);
        });
        paintTable(filterArr);

    });

    //фильтр по году окончания обучения
    document.getElementById('filteryearend').addEventListener('input', (el) => {

        let filterArr = arr_student.filter(function(item) {

            return parseInt(item.yearstart) + 4 === parseInt(el.currentTarget.value);
        });
        paintTable(filterArr);

    });

    document.getElementById('tststudent').addEventListener('click', function() {
        const newLocal = 'физмат';
        arr_student = [{ 'secondname': 'Иванов', 'name': 'Иван', 'patronymic': 'Иванович', 'facultet': 'физика', 'datebirth': new Date('1990-01-12'), 'yearstart': 2015 },
            { 'secondname': 'Петров', 'name': 'Тимур', 'patronymic': 'Борисович', 'facultet': 'информатика', 'datebirth': new Date('1997-02-15'), 'yearstart': 2001 },
            { 'secondname': 'Давыдов', 'name': 'Дмитрий', 'patronymic': 'Иванович', 'facultet': 'физмат', 'datebirth': new Date('1970-01-07'), 'yearstart': 2001 },
            { 'secondname': 'Давыдов', 'name': 'Василий', 'patronymic': 'Данилович', 'facultet': 'химия', 'datebirth': new Date('1970-01-07'), 'yearstart': 2001 },
            { 'secondname': 'Харитонов', 'name': 'Степан', 'patronymic': 'Исаевич', 'facultet': 'физмат', 'datebirth': new Date('1970-01-07'), 'yearstart': 2001 }

        ];
        paintTable(arr_student);
    });

    document.getElementById('cancel').addEventListener('click', function() {
        document.querySelector(".students__new-student").classList.add('hide');
    })
});