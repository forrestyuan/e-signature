import { makeAutoObservable } from "mobx";
import {createStore} from '@/utils/create-store'

export type Lang = 'zh-hant' |'zh-hans' | 'en'
class EnvStore{
  constructor(){
    makeAutoObservable(this)
  }
  lang:Lang = 'zh-hans'
}

export const [useEnvStore, store, context] = createStore(EnvStore)