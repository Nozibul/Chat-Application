
import { apiSlice } from "../api/apiSlice";

export const conversationsApi = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        // endpoints here
        getConversations : builder.query({
          query:(email)=>`/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_CONVERSATIONS_LIMIT}`
        }),

        getConversation: builder.query({
          query:({usersEmail, participantEmail})=>`/conversations?participants_like=${usersEmail}-${participantEmail}&&participants_like=${participantEmail}-${usersEmail}`
        }),

        addConversation: builder.mutation({
          query: (data)=>({
            url: "/conversations",
            method: "POST",
            body: data,
          }),
        }),

        editConversation: builder.mutation({
          query: ({id, data})=> ({
            url:`/conversations/${id}`,
            method: "PATCH",
            body: data,
          })
        })
    }),
});

export const { 
  useGetConversationsQuery, 
  useGetConversationQuery,
  useAddConversationMutation,
  useEditConversationMutation
} = conversationsApi;

