import {useLifecycles} from 'react-use'
import _debounce from 'lodash.debounce'
/**
 * @description 设置html的font-size，rem自适应
 * @pwidth 设计稿宽度
 * @prem 转换比例
 */
class PxToRem{
  owidth = 1440
  pwidth = 1440
  prem = 100

  constructor(width:number, rate:number){
    this.pwidth = width ?? this.pwidth
    this.prem = rate ?? this.prem
  }

  setRem(){
    //拿到html页面
    const html = document.getElementsByTagName('html')[0]
    //拿到当前窗口宽度
    let currentWidth = document.body.clientWidth || document.documentElement.clientWidth
    //设置实际的宽度
    this.owidth = currentWidth > 1440 ? 1440 : currentWidth < 800 ? 800 : currentWidth
    // 根据比例求出需要设置的font-size
    html.style.fontSize = (this.pwidth / this.prem) * this.owidth + 'px'
  }
}

export const px2Rem = new PxToRem(1400, 100)

const handleResize = () => _debounce(()=>px2Rem.setRem(), 200)

export function useSetRem(){
  useLifecycles(()=>{
    px2Rem.setRem()
    window.addEventListener('resize', handleResize)
  },()=>{
    window.removeEventListener('resize', handleResize)
  })
}
