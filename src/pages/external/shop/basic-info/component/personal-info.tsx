import { UseFormReturn } from "react-hook-form"

interface Iprops<T = any> {
    methods: UseFormReturn<T>

}
export const PersonalInfo = (props: Iprops) => {
    const { methods } = props
    return <div>PersonalInfo</div>
}