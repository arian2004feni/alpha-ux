import Form from 'next/form'
 
export default function SearchForm() {
  return (
    <Form action="/" scroll={false} className='flex justify-center mt-5'>
      {/* On submission, the input value will be appended to
          the URL, e.g. /search?query=abc */}
      <input name="query" defaultValue={""} className='bg-white text-black py-1 px-2' />
      <button type="submit">Submit</button>
    </Form>
  )
}