import { BiCategory } from 'react-icons/bi';
import {
  BsCapslock,
  BsChevronLeft,
  BsChevronRight,
  BsEnvelope,
  BsMailbox,
  BsTrash,
} from 'react-icons/bs';
import { FiExternalLink } from 'react-icons/fi';
import { HiLink } from 'react-icons/hi';
import { IoMdCopy } from 'react-icons/io';
import { IoChevronDownSharp, IoChevronUpSharp } from 'react-icons/io5';
import { LuTextSearch } from 'react-icons/lu';
import {
  MdAdd,
  MdArrowBack,
  MdBookmarkAdd,
  MdBookmarkRemove,
  MdCheck,
  MdCheckCircle,
  MdChevronLeft,
  MdChevronRight,
  MdClose,
  MdError,
  MdLockOutline,
  MdNewspaper,
  MdOutlineArticle,
  MdOutlineBackspace,
  MdOutlineEdit,
  MdOutlineSettings,
  MdOutlineShare,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
  MdRefresh,
  MdSearch,
} from 'react-icons/md';
import { RiZoomInLine, RiZoomOutLine } from 'react-icons/ri';
import { SlOptions, SlOptionsVertical } from 'react-icons/sl';
import { TbEyeCheck, TbEyeX } from 'react-icons/tb';

export const icons = {
  'arrow-back': MdArrowBack,
  backspace: MdOutlineBackspace,
  'caps-lock': BsCapslock,
  categories: BiCategory,
  checkmark: MdCheck,
  'check-circle': MdCheckCircle,
  'chevron-down': IoChevronDownSharp,
  'chevron-left': MdChevronLeft,
  'chevron-left-light': BsChevronLeft,
  'chevron-right': MdChevronRight,
  'chevron-right-light': BsChevronRight,
  'chevron-up': IoChevronUpSharp,
  close: MdClose,
  copy: IoMdCopy,
  document: MdOutlineArticle,
  edit: MdOutlineEdit,
  error: MdError,
  external: FiExternalLink,
  hide: MdOutlineVisibilityOff,
  link: HiLink,
  logo: MdNewspaper,
  mail: BsEnvelope,
  mailbox: BsMailbox,
  'mark-read': TbEyeCheck,
  'mark-unread': TbEyeX,
  'options-horizontal': SlOptions,
  'options-vertical': SlOptionsVertical,
  padlock: MdLockOutline,
  plus: MdAdd,
  refresh: MdRefresh,
  'save-article': MdBookmarkAdd,
  search: MdSearch,
  'search-text': LuTextSearch,
  settings: MdOutlineSettings,
  share: MdOutlineShare,
  show: MdOutlineVisibility,
  trash: BsTrash,
  'unsave-article': MdBookmarkRemove,
  'zoom-in': RiZoomInLine,
  'zoom-out': RiZoomOutLine,
};

export const sizes = {
  xs: '1rem',
  sm: '1.25rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '2.5rem',
};

export type IconName = keyof typeof icons;
export type IconSize = keyof typeof sizes;
