<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import 'vue3-carousel/dist/carousel.css'
import emailjs from '@emailjs/browser'
import { ElMessage } from 'element-plus'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { getAssetsFile } from '@/utils/commonUse'
components: {
  Carousel,
  Slide,
  Pagination,
  Navigation
}
const showBigPhoto = ref(false)
const p = ref('')
const pType = ref('')
const pLimit = ref(0)
const nowIndex = ref(0)
const nowPic = computed(() => {
  return getAssetsFile(`${p.value}.png`)
})
const show = (type, idx, limit) => {
  pLimit.value = limit
  pType.value = type
  showBigPhoto.value = true
  nowIndex.value = idx
  p.value = type + idx.toString()
  console.log(p.value)
  const elHtml = document.querySelector('html')
  elHtml.style.overflowY = 'hidden'
}
const breakpoints = {
  // 700px and up
  700: {
    itemsToShow: 3,
    snapAlign: 'center',
  },
  // 1024 and up
  1290: {
    itemsToShow: 5,
    snapAlign: 'start',
  },
}
const breakpointsM = {
  // 700px and up
  700: {
    itemsToShow: 1,
    snapAlign: 'center',
  },
  // 1024 and up
  1290: {
    itemsToShow: 1,
    snapAlign: 'start',
  },
}
const changePicIndex = (type) => {
  type == 'back' ? nowIndex.value -= 1 : nowIndex.value += 1
  let n = nowIndex.value
  p.value = pType.value + n.toString()
}
import { getAssetsFileIcon } from '@/utils/commonUse.js'
const optionList = ref(['HOME', 'SERVICES', 'GALLERY', 'CONTACT US'])
const iconList = ref(['NAILS', 'WAXING', 'EYELASH', 'SPA', 'MASSAGE'])
const menuShow = ref(false)

const scrollTo = (id) => {
  if(menuShow.value){
    menuShow.value = false
  }
  const element = document.getElementById(id)
  console.log(element)
  if(element){
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - 120;
    window.scrollTo({behavior: 'smooth', top: offsetPosition})
  }
}
const screenWidth = ref(window.innerWidth);
const handleResize = () => {
  screenWidth.value = window.innerWidth;
  if(screenWidth.value <= 1024){
    isComputer.value = false
  } else {
    isComputer.value = true
  }
};
const isComputer = ref(true)
watch(screenWidth, (newValue, oldValue) => {
  if(newValue <= 1025){
    isComputer.value = false
  } else {
    isComputer.value = true
  }
});
onMounted(() => {
  window.addEventListener('resize', handleResize);
  handleResize()
});
const closeBigPhoto = () => {
  showBigPhoto.value = false
  const elHtml = document.querySelector('html')
  elHtml.style.overflowY = null
}
const linkToIg = () => {
  window.open('https://www.instagram.com/fashion.nail.spa/')
}
const footerList = ref([
  {title: 'ADDRESS', content: ['59 Outwater Ln, Garfield,', 'NJ 07026'], type: 1},
  {title: 'CONTACT', content: ['Tel: (646) 980-9666'], type: 1},
  {title: 'BUSINESS HOURS', content: ['Mon-Fri: 9:30am-7:30pm', 'Saturday: 9:30am-7:00pm', 'Sunday - 10:00am-6:00pm'], type: 1},
  {title: 'STAY UPDATED', type: 2},
])
const emailInput = ref('')
const successMes = () => {
  ElMessage('successfully subscribe.')
}
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      btnDis.value = true
      const mailData = {
        Name: tableForm.name,
        email: tableForm.email,
        message: tableForm.message,
      }
      emailjs.send('service_dmyuq3x', 'template_wpc6tuk', mailData, 'Gj4qVySalyOlMjmDT').then(() => {
        tableForm.name = ''
        tableForm.email = ''
        tableForm.message = ''
        btnDis.value = false
        successMes()
      })
      return true
    } else {
      return false
    }
  })
} 
</script>

<template>
  <div class="wrapper ">
    <div id="HOME" class="header" :class="{'isPhone': !isComputer}">
      <div class="section1" :class="{'phoneFixed': !isComputer}">
        <div class="section1Title">UNA NAIL</div>
        <div class="optionList">
          <div v-for="(item, index) in optionList" :key="index" @click="scrollTo(item)">{{ item }}</div>
        </div>
        <div @click="menuShow = true" class="menuIcon"><img src="../assets/icon/menuIcon.svg" alt=""></div>
        <el-drawer v-model="menuShow" :with-header="false" size="45%">
          <div style="cursor: pointer;margin: 20px 0;" v-for="(item, index) in optionList" :key="index" @click="scrollTo(item)">{{ item }}</div>
        </el-drawer>
      </div> 
      <div class="section2 !lato mobile:!text-[13px]">Elegance in Every Touch.<hr>Glamour in Every Detail.</div>
      <div class="section3"><img src="../assets/img/1.png" alt="" class="object-cover"></div>
      <div class="paintWall" />
    </div>
    <!-- 輪播 -->
    <div v-if="isComputer" id="GALLERY" class="w-screen py-10 flex flex-col items-center tablet:hidden">
      <div class="max-w-[1200px]">
        <Carousel :snapAlign="'center'" :breakpoints="breakpoints">
          <Slide v-for="slide in 10" :key="slide" @click="show('m', slide, 10)">
            <div class="carousel__item">
              <!-- <img :src="getAssetsFile(`m${slide}.png`)" class="w-[200px]"> -->
              <img :src="getAssetsFile(`m${slide}.png`)" class="w-[220px] h-[281px] object-cover cursor-pointer">
            </div>
          </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
    </div>
    <!-- 輪播RWD -->
    <div v-else id="GALLERY" class="w-screen px-5 gap-3 tablet:grid tablet:grid-cols-2 mb-5 desktop:hidden">
      <img :src="getAssetsFile(`m${pic}.png`)" alt="" v-for="pic in 6" class="w-[100%] h-[100%] object-cover cursor-pointer" @click="show('m', pic, 6)">
    </div>
    <!-- 圖片放大 + 遮罩 -->
    <div class="fixed top-0 left-0 w-screen h-screen flex items-center justify-center pic z-[1000]" v-if="showBigPhoto">
      <div class="absolute right-10 top-5 text-xl font-semibold z-20 text-white cursor-pointer" @click="closeBigPhoto()">CLOSE</div>
      <img src="@/assets/img/ca.png" class="rotate-180 w-[50px] absolute top-[50%] left-[10%] translate-y-[-50%] cursor-pointer mobile:left-[2%]" v-if="nowIndex > 1" @click="changePicIndex('back')">
      <img :src="nowPic" class="w-[70vw] h-[80vh] object-contain">
      <img src="@/assets/img/ca.png" class="w-[50px] absolute top-[50%] right-[10%] translate-y-[-50%] cursor-pointer mobile:right-[2%]" v-if="nowIndex < pLimit" @click="changePicIndex('go')">
    </div>
    <div class="w-full h-[524px] relative flex justify-center items-end bg-[#F4CC82] tablet:hidden mobile:hidden">
      <div class="w-[746px] h-[437px] relative bgimg">
        <div data-aos="zoom-in" data-aos-duration="1500" class="bg-[#E1DFD6] w-[299px] h-[143px] font-extrabold text-[40px] text-center pt-[19px] text-[#9B6619] lato leading-[48px] tracking-widest absolute bottom-[108px] left-[-150px]">
          About<br/>UNA NAIL
        </div>
        <img data-aos="fade-down-left" data-aos-duration="1500" src="@/assets/img/c1.jpg" alt="" class="w-[193px] h-[193px] rounded-[50%] absolute right-[-96.5px] bottom-[41px] object-cover">
        <div class="px-[186px] pt-[72px] pb-[35px] leading-[23.04px] font-[600] tracking-widest flex flex-col gap-[12px]">
          <div class="lato" data-aos="fade-up" data-aos-duration="2000">Experience the epitome of luxury and relaxation at our No.1 Best Nail Spa in NY, New York. With an unrivaled reputation for excellence, we offer a comprehensive range of services that cater to your every nail care need. Our expert technicians specialize in manicures, pedicures, tips, SNS treatments, spa pedicures, spa manicures, and nail design, ensuring that you leave our spa feeling utterly pampered and looking stunning.</div>
        </div>
      </div>
    </div>
    <div class="w-full bg-[#F4CC82] desktop:hidden flex flex-col items-center pt-[64px] gap-[24px]">
      <div class="text-white text-center font-extrabold tracking-widest text-[22px]">
        About<br/>UNA NAIL
      </div>
      <div class="bgimgM h-[354px] w-full flex items-center justify-center pt-[300px] tracking-widest">
        <div class="lato w-[60vw]">Experience the epitome of luxury and relaxation at our No.1 Best Nail Spa in NY, New York. With an unrivaled reputation for excellence, we offer a comprehensive range of services that cater to your every nail care need. Our expert technicians specialize in manicures, pedicures, tips, SNS treatments, spa pedicures, spa manicures, and nail design, ensuring that you leave our spa feeling utterly pampered and looking stunning.</div>
      </div>
    </div>
    <div class="w-screen h-[22rem] mobile:hidden">
      <img class="w-full h-full object-cover" src="@/assets/img/nails.png" alt="fashion_nail_spa">
    </div>
    <div class="w-full justify-center mobile:flex mobile:mt-[1rem] hidden">
      <img class="w-[85%] h-[85%] object-cover" src="@/assets/img/phoneNails.jpg" alt="fashion_nail_spa">
    </div>
    <div class="w-full h-full bg-white justify-center items-center mobile:hidden">
      <img class="w-full h-full object-cover" src="@/assets/img/service.png" alt="fashion_nail_spa">
    </div>
    <div class="hidden mobile:flex mobile:flex-col mobile:items-center mb-[1.5rem]">
      <div v-for="(item, index) in 5" :key="index" class="w-[85%]">
        <img :src="getAssetsFile(`serviceMb${index + 1}.jpg`)"
        class="w-full object-cover cursor-pointer">
      </div>
    </div>
    <div class="flex justify-center items-center py-[7rem] gap-[2rem] mobile:hidden">
      <div class="w-[497px] h-[414px] relative">
        <img class="w-full h-full" src="@/assets/img/ins1.png" alt="fashion_nail_spa">
        <img @click="linkToIg" class="absolute right-[1rem] bottom-[1rem] cursor-pointer" src="@/assets/img/ig.png" alt="fashion_nail_spa">
      </div>
      <div class="w-[418px] h-[498px]">
        <img class="w-full h-full" src="@/assets/img/ins2.png" alt="fashion_nail_spa">
      </div>
    </div>
    <div class="mobile:flex mobile:flex-col mobile:items-center hidden">
      <div class="w-[85%] h-[249px] relative">
        <img class="w-full h-full" src="@/assets/img/insMb2.jpg" alt="fashion_nail_spa">
        <img @click="linkToIg" class="w-[74px] h-[24px] absolute left-[15%] bottom-[25%] cursor-pointer" src="@/assets/img/ig.png" alt="fashion_nail_spa">
      </div>
      <div class="w-[70%] h-[274px]">
        <img class="w-full h-full" src="@/assets/img/insMb1.jpg" alt="fashion_nail_spa">
      </div>
    </div>
    <div id="footer" class="w-full h-[20rem] flex justify-center items-center bg-[#FEF2E8] mobile:hidden">
      <div class="flex justify-evenly w-full max-w-[1200px]">
        <div v-for="(item, index) in footerList" :key="index" class="flex flex-col gap-[1rem]">
          <div class="font-[700]">{{ item.title }}</div>
          <div v-if="item.type == 1">
            <div v-for="(item2, index2) in item.content" :key="index2" class="text-[14px] font-[400]">{{ item2 }}</div>
          </div>
          <div v-else class="flex flex-col gap-[1rem]">
            <el-input class="h-[37px]" v-model="emailInput" placeholder="Enter your email here*" />
            <div class="h-[37px] bg-black text-white text-[12px] font-[400] py-[0.8rem] px-[2.5rem] text-center">subscribe</div>
          </div>
        </div>
      </div>
    </div>
    <div id="footer" class="mobile:w-full mobile:h-full mobile:flex mobile:justify-center mobile:items-center mobile:bg-[#fff] hidden">
      <div class="flex flex-col justify-center items-center w-[80%] max-w-[1200px] bg-[#FEF2E8] py-[1rem] gap-[2rem]">
        <div v-for="(item, index) in footerList" :key="index" class="flex flex-col gap-[0.5rem] w-[75%]">
          <div class="font-[700]">{{ item.title }}</div>
          <div v-if="item.type == 1">
            <div v-for="(item2, index2) in item.content" :key="index2" class="text-[14px] font-[400]">{{ item2 }}</div>
          </div>
          <div v-else class="flex flex-col gap-[1rem] w-[80%]">
            <el-input class="h-[37px]" v-model="emailInput" placeholder="Enter your email here*" />
            <div class="h-[37px] bg-black text-white text-[12px] font-[400] py-[0.8rem] px-[2.5rem] text-center">subscribe</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lato {
  font-family: "Lato", sans-serif;
}
.bgimg {
  background-image: url('@/assets/img/re.png');
}
.bgimgM {
  background-image: url('@/assets/img/rem.png');
  background-repeat: no-repeat;
  background-size: cover;
}
@media screen and (min-width: 1290px) {
  :deep(.carousel__prev) {
    left: -45px;
  }
  :deep(.carousel__next) {
    right: -45px;
  }
}

.pic {
  background-color: rgba(0,0,0,0.7);
}
.wrapper{
  display: flex;
  flex-direction: column;
}
.header {
  padding: 8rem 120px;
  background-color: #F4CC82;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 35px;
  position: relative;
  &.isPhone{
    padding-top: 80px;
  }
  .paintWall{
    position: absolute;
    bottom: 0;
    background-color: #fff;
    width: 100%;
    height: 180px;
    z-index: 3;
  }
  .section1{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3rem 15%;
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #F4CC82;
    z-index: 100;
    &.phoneFixed{
        padding: 25px 50px;
    }
    .section1Title{
      font-weight: 700;
      font-size: 18px;
    }
    .optionList{
      display: flex;
      gap: 30px;
      >div{
        font-size: 14px;
        font-weight: 400;
        cursor: pointer;
      }
    }
    .menuIcon{
      display: none;
    }
  }
  .section2{
    font-size: 24px;
    font-weight: 400;
    // font-family: Jomolhari;
    letter-spacing: 8px;
    text-align: center;
  }
  .section3{
    z-index: 5;
    img{
      width: 620px;
      height: 336px;
    }
  }
}
.servicePrice{
  display: flex;
  align-items: center;
  padding: 0 100px;
  .store{
    width: 50%;
    height: 479px;
    z-index: 3;
    img{
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .service{
    width: 50%;
    display: flex;
    justify-content: center;
    background-color: #E5D6CD;
    position: relative;
    img{
      object-fit: contain;
    }
    &::before{
      z-index: 2;
      position: absolute;
      left: -300px;
      top: 0;
      content: '';
      display: block;
      height: 100%;
      width: 300px;
      background-color: #E5D6CD;
    }
  }
}
.menu{
  width: 100%;
  img{
    width: 100%;
  }
}
.phoneServicePrice{
  display: none;
}
.iconList{
  width: 100%;
  padding: 4.5rem 15%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 80px;
  >div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-family: Jomolhari;
    gap: 10px;
    img{
      width: 125px;
      height: 125px;
    }
  }
}
:deep(.el-input__wrapper){
  background: transparent;
  border: 2px solid black;
}
// @media screen and (min-width: 768px) and (max-width: 1280px) 
@media screen and (max-width: 768px) {
  .header{
    padding: 32px 42px;
    .section1{
      .optionList{
        display: none;
      }
      .menuIcon{
        display: block;
        cursor: pointer;
      }
    }
    .section2{
      font-size: 20px;
    }
    .section3{
      img{
        width: 280px;
        height: 151px;
      }
    }
    .paintWall{
      height: 80px;
    }
  }
  .igArea{
    flex-direction: column;
    >img, >div{
      width: 100%;
    }
    >div{
      padding-top: 2rem;
      padding-bottom: 2rem;
    }
    span{
      display: none;
    }
  }
  .servicePrice, .menu{
    display: none;
  }
  .phoneServicePrice{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img{
      width: 100%;
    }
  }
  .iconList{
    flex-direction: column;
  }
  .footer{
    padding: 3.5rem 0;
    .footerSection{
      display: none;
    }
    .CONTACT{
      display: flex;
      flex-direction: column;
      align-items: center;
      .phoneFooterSection{
        width: 60%;
        display: flex;
        flex-direction: column;
      }
    }
  }
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
  .header{
    .section1{
      .optionList{
        display: none;
      }
      .menuIcon{
        display: block;
        cursor: pointer;
      }
    }
  }
     
  .igArea{
    flex-direction: column;
    >img, >div{
      width: 100%;
    }
    >div{
      padding-top: 2rem;
      padding-bottom: 2rem;
    }
    span{
      display: none;
    }
  }
  .servicePrice, .menu{
    display: none;
  }
  .phoneServicePrice{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img{
      width: 100%;
    }
  }
  .iconList{
    flex-direction: column;
  }
  .footer{
    padding: 3.5rem 0;
    .footerSection{
      display: none;
    }
    .CONTACT{
      .phoneFooterSection{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
      }
    }
  }
}
</style>