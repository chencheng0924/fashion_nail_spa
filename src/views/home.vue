<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import 'vue3-carousel/dist/carousel.css'
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
    <div class="w-screen flex items-center flex-col pt-[111px] pb-[189px] px-20" >
      <div class="max-w-[1200px] w-full flex flex-wrap gap-5 justify-between mobile:hidden">
        <img :src="getAssetsFile(`d${pic}.png`)" alt="" v-for="pic in 5" class="w-[191px] h-[250px] tablet:w-[100%] tablet:h-auto object-cover cursor-pointer" @click="show('d', pic, 5)">
      </div>
    </div>
    <div v-if="isComputer" class="flex flex-col justify-center items-center gap-[2rem] py-[5rem] bg-[#F4CC82] mobile:hidden">
      <div id="SERVICES" class="text-[36px] font-[700] text-[#865105]">Services & Prices</div>
      <div class="flex items-center px-[10%] gap-10">
        <img @click="show('service', 0, 1)" class="w-[35rem] h-[42rem] object-contain" src="@/assets/img/service0.png" alt="">
        <div class="w-[26rem] flex flex-col relative">
          <img class="w-[24rem] h-[16rem] object-cover" src="@/assets/img/servicePic1.jpg" alt="">
          <div class="w-[24rem] h-[16rem]" />
          <img class="w-[24rem] h-[16rem] object-cover absolute right-0 bottom-[3%]" src="@/assets/img/servicePic2.jpg" alt="">
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col justify-center items-center bg-[#F4CC82] desktop:hidden pt-[70px] px-[24px] pb-[62px]">
      <div id="SERVICES" class="font-[700] text-[#865105]">Services & Prices</div>
      <img class="w-full object-contain mt-[24px]" src="@/assets/img/service0.png" alt="">
      <div class="w-[90%] mt-[42px]">
        <!-- ?推不上去？ -->
        <Carousel :snapAlign="'center'" :breakpoints="breakpointsM">
          <Slide v-for="slide in 5" :key="slide" @click="show('d', slide, 5)">
            <div class="carousel__item">
              <!-- <img :src="getAssetsFile(`m${slide}.png`)" class="w-[200px]"> -->
              <img :src="getAssetsFile(`d${slide}.png`)" class="w-[220px] h-[281px] object-cover cursor-pointer">
            </div>
          </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
      <!-- <div class="flex items-center px-[10%] gap-10">
        <div class="w-[26rem] flex flex-col relative">
          <img class="w-[24rem] h-[16rem] object-cover" src="@/assets/img/servicePic1.jpg" alt="">
          <div class="w-[24rem] h-[16rem]" />
          <img class="w-[24rem] h-[16rem] object-cover absolute right-0 bottom-[3%]" src="@/assets/img/servicePic2.jpg" alt="">
        </div>
      </div> -->
    </div>
    <div class="iconList">
      <div v-for="(item, index) in iconList" :key="index">
        <img :src="getAssetsFileIcon(`${index + 1}.svg`)" alt="">
        {{ item }}
      </div>
    </div>
    <!-- NAIL IT WITH STYLE! -->
    <div id="CONTACT US" class="w-screen flex h-[23rem] mobile:h-full igArea">
      <img src="@/assets/img/pp.png" alt="" class="w-[30%] mobile:h-[16rem] object-cover">
      <div class="w-[80%] bg-[#E1DFD6] flex flex-col items-center justify-center gap-5">
        <span class="leading-[38.22px] text-[32px] font-bold mb-5" style="font-family: JosefinSlab;letter-spacing: 5px;">NAIL IT WITH STYLE!</span>
        <div class="flex gap-5 items-center">
          <img src="@/assets/img/ig.svg" alt="" class="w-[58px] h-[58px] mr-5">
          <div class="flex flex-col items-center justify-between">
            <div class="text-[24px]" style="font-family: KaushanScript;letter-spacing: 5px;">Follow & Share</div>
            <a href="https://www.instagram.com/una.nail.a" target="_blank" class="underline text-[24px]" style="font-family: KaiseiDecol;letter-spacing: 2px;">@una.nail.a</a>
          </div>
        </div>
      </div>
    </div>
    <!-- <div v-if="isComputer" class="iconList">
      <div v-for="(item, index) in iconList" :key="index">
        <img :src="getAssetsFileIcon(`${index + 1}.svg`)" alt="">
        {{ item }}
      </div>
    </div> -->
    <div class="footer !bg-[#F4CC82]">
      <div class="CONTACT">
        <div  class="footerSection">
          <div class="footerContent">
            <div class="section1">
              <div class="title mb-3">UNA NAIL</div>
              <div class="flex flex-col">
                <div>PHONE</div>
                <div class="font-[600]">+1 631-521-6999</div>
              </div>
              <div class="flex flex-col">
                <div>ADDRESS</div>
                <div class="font-[600]">1610 B, Grand Ave, Baldwin, NY 11510</div>
              </div>
              <div>@2024 UNA NAIL. All Rights Reserved.</div>
            </div>
            <!-- <div class="section2">
              <div class="time">OPENING HOURS</div>
              <div>Monday - Saturday<hr>10:00 - 19:30</div>
              <div>Sunday<hr>10:00 - 18:00</div>
            </div> -->
            <div class="section3">
              <div v-for="(item, index) in optionList" :key="index" @click="scrollTo(item)" class="font-[700]">{{ item }}</div>
            </div>
          </div>
          <div class="footerImg"><img src="../assets/img/footerImg.png" alt=""></div>
        </div>
        <div class="phoneFooterSection gap-10">
          <div class="text-[20px] font-[700] mb-[1rem]">UNA NAIL</div>
          <div class="flex flex-col gap-2">
            <div class="cursor-pointer my-1 font-[700] mobile:font-[400]" v-for="(item, index) in optionList" :key="index" @click="scrollTo(item)">{{ item }}</div>
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex flex-col">
              <div class="mobile:font-[600]">PHONE</div>
              <div class="font-[600] mobile:font-[300]">+1 631-521-6999</div>
            </div>
            <div class="flex flex-col">
              <div class="mobile:font-[600]">ADDRESS</div>
              <div class="font-[600] mobile:font-[300]">1610 B, Grand Ave, Baldwin, NY 11510</div>
            </div>
          </div>
          <div class="mb-2">
            <div class="mobile:font-[600]">OPENING HOURS</div>
            <div class="flex flex-col font-[600] mobile:font-[300]">
              <div class="flex justify-between items-center">
                <div>Monday - Saturday</div>
                <div>10:00 - 19:30</div>
              </div>
              <div class="flex justify-between items-center">
                <div>Sunday</div>
                <div>10:00 - 18:00</div>
              </div>
            </div>
          </div>
          <div class="text-[10px] font-[300]">@2024 UNA NAIL. All Rights Reserved.</div>
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
.footer{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // padding: 50px 0 0 ;
  gap: 50px;
  .CONTACT{
    width: 100%;
  }
  .footerSection{
    display: flex;
    align-items: center;
    width: 100%;
    height: 341px;
    .footerContent{
      background-color: #F4CC82;
      width: 60%;
      height: 100%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      .section1{
        display: flex;
        flex-direction: column;
        gap: 20px;
        >div{
          font-family: KaiseiDecol;
          font-size: 14px;
          font-weight: 400;
        }
        .title{
          font-weight: 700;
          font-size: 24px;
          font-family: Jomolhari;
        }
      }
      .section2{
        display: flex;
        flex-direction: column;
        gap: 5px;
        >div{
          font-family: 'KaiseiDecol';
          font-size: 14px;
          font-weight: 400;
        }
        .time{
          font-size: 16px;
        }
      }
      .section3{
        >div{
          font-family: KaiseiDecol;
          font-size: 14px;
          cursor: pointer;
        }
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
    }
    .footerImg{
      width: 40%;
      height: 100%;
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .phoneFooterSection{
    display: none;
  }
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