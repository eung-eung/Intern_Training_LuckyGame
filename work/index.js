const name_input = document.querySelector('#name')
const phone_input = document.querySelector('#phone')
const mail_input = document.querySelector('#email')
const submit_button = document.querySelector('.submit_register')
let isValid = false
const clear_warning = (node) => {
    node.innerText = ""
}
const checkValid_Name = () => {

    const warning_name_div = document.querySelector('.warning_name')
    clear_warning(warning_name_div)
    console.log(name_input.value.trim() != "")
    if (name_input.value.length <= 2 || name_input.value.trim() == "") {
        warning_name_div.innerText = 'Tên cần có trên 2 kí tự.'
        // isValid = false
        return false
    }
    return true
    // isValid = true
}
const checkValid_Phone = () => {
    const wanrning_phone_div = document.querySelector('.warning_phone')
    let regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    clear_warning(wanrning_phone_div)
    if (!regex.test(phone_input.value)) {
        wanrning_phone_div.innerText = 'Số điện thoại không đúng định dạng.'
        return false
    }
    return true

}
const checkValid_Email = () => {
    const warning_email_div = document.querySelector('.warning_email')
    clear_warning(warning_email_div)
    let email_regex =
        // /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/gm

    if (!email_regex.test(mail_input.value) && mail_input.value.length >= 1) {
        warning_email_div.innerText = 'Email không đúng định dạng.'
        return false
    } else if (mail_input.value == "") {
        warning_email_div.innerText = 'Không được bỏ trống.'
        return false
    }
    return true
}
name_input.addEventListener('input', checkValid_Name)

// phone input
phone_input.addEventListener('input', checkValid_Phone)
// mail input
mail_input.addEventListener('input', checkValid_Email)

// submit
const register_form = document.querySelector('.register_info')
const overlay = document.querySelector('.overlay')
const popup_box = document.querySelector('.popup_box')
const content_header = document.getElementById('content_header')
const save_success_HTML = `<div class="save_success">
<h2>Đã lưu thông tin người nhận</h2>
<p>Chọn 1 hộp quà bất kì</p>
</div>`
let user = {}
submit_button.addEventListener('click', function () {
    // console.log(isValid)
    let isValid_Mail = checkValid_Email()
    let isValid_Name = checkValid_Name()
    let isValid_Phone = checkValid_Phone()
    if (isValid_Mail && isValid_Name && isValid_Phone) {
        //    save user
        user = {
            name: name_input.value,
            phone: phone_input.value,
            emai: mail_input.value,
            prize: null,
            time: null
        }
        console.log(user)
        popup_box.innerHTML = save_success_HTML
        overlay.classList.add('open')

    }

})


console.log(content_header)

overlay.addEventListener('click', function () {
    if (overlay.classList.contains('open')) {
        console.log('click')
        overlay.style.display = 'none'
        popup_box.innerHTML = ""
    }
})
const setRotate = (gift, deg) => {
    return new Promise((resolve, reject) => {
        gift.classList.add('rotate')
        gift.style.transform = 'rotateY(' + deg + ')'
        setTimeout(function () {
            gift.classList.remove('rotate')
            resolve()
        }, 500)

    })
}
let click_time = 0

const voucher_list = [
    {
        id: 1,
        voucher: '/ảnh/200.png',
        value: 'Voucher 200.000 VNĐ',
        rate: 10
    },
    {
        id: 2,
        voucher: '/ảnh/300.png',
        value: 'Voucher 300.000 VNĐ',
        rate: 9
    },
    {
        id: 3,
        voucher: '/ảnh/500.png',
        value: 'Voucher 500.000 VNĐ',
        rate: 6
    },
    {
        id: 4,
        voucher: '/ảnh/800.png',
        value: 'Voucher 800.000 VNĐ',
        rate: 5
    },
    {
        id: 5,
        voucher: '/ảnh/laha.png',
        value: 'Voucher Coffee',
        rate: 70
    }
]

const random_voucher = (random) => {
    let rate = 0
    // let random =
    console.log("random:" + random)

    switch (true) {
        // 70, 5, 6, 9, 10
        // rate 5%
        case random <= 5:
            return 5
        // rate 6%
        case random > 5 && random <= 11:
            return 6
        // rate 9%
        case random > 11 && random <= 20:
            return 9
        // rate 10%
        case random > 20 && random <= 30:
            return 10
        // rate 70%
        case random > 30:
            return 70
    }


}
console.log(random_voucher())
const gifts = document.querySelectorAll('.gift')
const form = `<div class="register_info">
<h2>Đăng ký thông tin tham gia</h2>
<div class="input_box">
    <input id="name" type="text" placeholder="Nhập họ tên">
    <div class="warning_name"></div>
</div>
<div class="input_box">
    <input id="phone" type="text" placeholder="Nhập số điện thoại">
    <div class="warning_phone"></div>
</div>
<div class="input_box">
    <input id="email" type="email" placeholder="Nhập email">
    <div class="warning_email"></div>
</div>
<button type="button" class="submit_register">Tham gia ngay</button>
</div>`
const list_user = [
    {
        name: 'test 1',
        phone: '0987123456',
        emai: 'boyvi@gmail.com',
        prize: '800.000 VNĐ',
        time: '28-05-2023'
    },
    {
        name: 'test 2',
        phone: '0987122459',
        emai: 'botest@gmail.com',
        prize: '200.000 VNĐ',
        time: '29-05-2023'
    },
    {
        name: 'test 3',
        phone: '0987122459',
        emai: 'test@fpt.edu.vn',
        prize: '500.000 VNĐ',
        time: '30-05-2023'
    }
]
// spread chỉ dùng là tham số hoặc trong obj, array khi dùng destructuring
const getVoucher = (spread) => {
    return spread
}
let lastVoucher = ''
let count = 1
let flag = true
gifts.forEach(gift => {
    gift.addEventListener('click', function (e) {
        if (JSON.stringify(user) == '{}') {
            popup_box.innerHTML = form
            overlay.style.display = 'block'
        } else {
            if (click_time < 1) {
                setRotate(this, '-100deg')
                    .then(() => {
                        return new Promise(res => {
                            this.classList.add('voucher')
                            gift.style.transform = 'none'
                            // this.innerHTML = `<img src="/training/training2_luckyGame/ảnh/200.png" alt="">`
                            let random = Math.floor(Math.random() * 100)
                            let _voucher = voucher_list.filter(v => v.rate == random_voucher(random))
                            // 
                            console.log(getVoucher(..._voucher))

                            // let _voucherObj = _voucher.pop()
                            this.innerHTML = `<img src="${getVoucher(..._voucher).voucher} " alt="">`
                            click_time++
                            setTimeout(function () {
                                return res(getVoucher(..._voucher))
                            }, 500)
                        })

                    })
                    .then(obj => {
                        return new Promise(res => {
                            lastVoucher = obj.voucher
                            let currentDate = new Date()
                            user.prize = obj.value
                            user.time = currentDate.getDate() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getFullYear()
                            popup_box.innerHTML = ` 
                        <div class="success_notification">
                                <h2>Chúc mừng bạn đã trúng thưởng</h2>
                                <p class="render_voucher"> ${obj.value}</p>
                                <p class="text">(Vui lòng chọn "Xác nhận" để nhận thông tin qua Email)</p>
                                <button type="button" class="success_confirm">Xác nhận</button>
                        </div>`
                            overlay.style.display = 'block'
                            return res(user)
                        })
                    })
                    .then((_user) => {
                        return new Promise(res => {
                            list_user.push(_user)
                            console.log(list_user)
                            if (JSON.stringify(_user) != '{}') {
                                const node = document.createElement('p')
                                node.innerHTML = 'Danh sách người trúng thưởng'
                                node.classList.add('list_user')
                                content_header.appendChild(node)
                            }
                            return res(list_user)
                        })


                    })
                    .then(list => {
                        const list_button = document.querySelector('.list_user')

                        list_button.addEventListener('click', function () {
                            popup_box.innerHTML = `
                            <div class="list_prize_winner">

            <h2>Danh sách trúng thưởng</h2>

            <table class="table_header">
                <thead>
                    <tr>
                        <th class='width_th'>Họ và tên</th>
                        <th>Số điện thoại</th>
                        <th>Phần thưởng</th>
                        <th>Thời gian</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="4" style="padding: 0;">
                            <div class="scroll_y">
                                <table class="table_body">
                                   
                                </table>

                            </div>
                        </td>
                    </tr>


                </tbody>

            </table>

        </div>                            
                            `
                            const render_body = document.querySelector('.table_body')
                            let htmls = list.map(user => {
                                return `
                                <tr>
                                    <td  class='width_th'>${user.name}</td>
                                    <td>${format_phone(user.phone)}</td>
                                    <td>${user.prize}</td>
                                    <td>${user.time}</td>
                            </tr>`
                            })
                            render_body.innerHTML = htmls.join('')
                            overlay.classList.add('open')
                            overlay.style.display = 'block'

                        })
                    })
                    .then(() => {
                        const success_confirm = document.querySelector('.success_confirm')
                        // const success_notification = document.querySelector('.success_notification')
                        success_confirm.addEventListener('click', function () {
                            overlay.style.display = 'none'
                            popup_box.innerHTML = ""
                        })
                    })
            }
            // }
            else {
                // if (this.classList.contains('voucher') && count % 2 != 0) {
                if (this.classList.contains('voucher') && flag == true) {
                    console.log(true)
                    this.style.userSelect = 'none'
                    setRotate(this, '100deg')
                        .then(() => {
                            gift.style.transform = 'none'
                            flag = false
                            this.innerHTML = `<img src="/training/training2_luckyGame/ảnh/gift.png" alt="">`


                            // this.style.userSelect = 'auto'
                        })

                }
                // else if (this.classList.contains('voucher') && count % 2 == 0) {
                else if (this.classList.contains('voucher') && flag == false) {
                    setRotate(this, '100deg')
                        .then(() => {
                            gift.style.transform = 'none'
                            flag = true
                            this.innerHTML = `<img src="${lastVoucher}" alt="">`

                        })
                }
            }

        }

    })
});

// console.log(currentDate.getDate() + '-' + currentDate.getMonth() + '-' + currentDate.getFullYear())
const format_phone = (phoneNumber) => {
    console.log(phoneNumber)

    return phoneNumber.slice(0, 7) + phoneNumber.slice(7, 10).replace(/./g, '*')
}


// format_phone('0392103123')