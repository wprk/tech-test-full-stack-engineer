import React from 'react'
import Loader from 'react-loader-spinner'

type IProps = {
  color?: string;
  size?: number;
}

const Loading = ({ color = '#E65C0D', size = 20 }: IProps) => (
  <div className="flex items-center justify-center">
    <Loader
      type="ThreeDots"
      color={color}
      height={size}
      width={size * 3}
      timeout={0}
    />
  </div>
)

export default Loading
